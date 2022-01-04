import Realm from "realm";

const Project = {
  name: "Project",
  properties: {
    name: "string",
    tasks: "Task[]",
  },
};
const Task = {
  name: "Task",
  properties: {
    name: "string",
    isComplete: "bool",
    assignee: "string?",
    priority: "int",
    progressMinutes: "int",
  },
};

describe("Realm Query Language Reference", () => {
  let realm;
  beforeEach(async () => {
    realm = await Realm.open({
      schema: [Project, Task],
    });

    // populate test objects
    realm.write(() => {
      realm.create("Project", {
        name: "New Project",
      });
      realm.create("Task", {
        name: "Write tests",
        isComplete: false,
        assignee: "Alex",
        priority: 5,
        progressMinutes: 125,
      });
      realm.create("Task", {
        name: "Run tests",
        isComplete: false,
        assignee: "Ali",
        priority: 9,
        progressMinutes: 10,
      });
      realm.create("Task", {
        name: "Bluehawk Tests",
        isComplete: false,
        assignee: null,
        priority: 10,
        progressMinutes: 55,
      });
    });

    expect(realm.objects("Project")[0].name).toBe("New Project");
    expect(realm.objects("Task")[0].name).toBe("Write tests");
  });

  afterEach(() => {
    // After the test, delete the objects and close the realm
    realm.write(() => {
      realm.deleteAll();
    });
    realm.close();
  });

  test("comparison queries", () => {
    const tasks = realm.objects("Task");

    const highPriorityTasks = tasks.filtered(
      // :code-block-start: comparison-operators
      "priority > 5"
      // :hide-start:
    );
    expect(highPriorityTasks.length).toBe(2);

    const longRunningTasks = tasks.filtered(
      // :hide-end:

      "progressMinutes > 120"
      // :hide-start:
    );
    expect(longRunningTasks.length).toBe(1);

    const unassignedTasks = tasks.filtered(
      // :hide-end:

      "assignee == nil"
      // :hide-start:
    );
    expect(unassignedTasks.length).toBe(1);

    const progressMinutesRange = tasks.filtered(
      // :hide-end:

      "progressMinutes BETWEEN { 30,60 }"
      // :code-block-end:
    );
    expect(progressMinutesRange.length).toBe(1);
  });

  test("logic queries", () => {
    const tasks = realm.objects("Task");
    const projects = realm.objects("Project");

    const aliComplete = tasks.filtered(
      // :code-block-start: logical-operators
      "assignee == 'Ali' AND isComplete == true"
      // :code-block-end:
    );
    expect(aliComplete.length).toBe(0);

    // :code-block-start: string-operators
    // :hide-start:
    const startWithE = projects.filtered(
      // :hide-end:
      "name BEGINSWITH[c] 'e'"
      // :hide-start:
    );
    expect(startWithE.length).toBe(0);

    const containIe = projects.filtered(
      // :hide-end:

      "name CONTAINS 'ie'"
      // :code-block-end:
    );
    expect(containIe.length).toBe(0);
  });

  test("aggregate queries", () => {
    const projects = realm.objects("Project");
    const averageTaskPriorityAbove5 = projects.filtered(
      // :code-block-start: aggregate-operators
      "tasks.@avg.priority > 5"
      // :hide-start:
    );
    expect(averageTaskPriorityAbove5.length).toBe(0);

    const allTasksLowerPriority = projects.filtered(
      // :hide-end:

      "tasks.@max.priority < 5"
      // :hide-start:
    );
    expect(allTasksLowerPriority.length).toBe(0);

    const allTasksHighPriority = projects.filtered(
      // :hide-end:

      "tasks.@min.priority > 5"
      // :hide-start:
    );
    expect(allTasksHighPriority.length).toBe(0);

    const moreThan5Tasks = projects.filtered(
      // :hide-end:

      "tasks.@count > 5"
      // :hide-start:
    );
    expect(moreThan5Tasks.length).toBe(0);

    const longRunningProjects = projects.filtered(
      // :hide-end:

      "tasks.@sum.progressMinutes > 100"
      // :code-block-end:
    );
    expect(longRunningProjects.length).toBe(0);
  });

  test("collection queries", () => {
    const projects = realm.objects("Project");
    const noCompleteTasks = projects.filtered(
      // :code-block-start: set-operators
      "NONE tasks.isComplete == true"
      // :hide-start:
    );
    expect(noCompleteTasks.length).toBe(1);

    const anyTopPriorityTasks = projects.filtered(
      // :hide-end:

      "ANY tasks.priority == 10"
      // :code-block-end:
    );
    expect(anyTopPriorityTasks.length).toBe(0);
  });

  test("sort, distinct and limit queries", () => {
    const tasks = realm.objects("Task");

    const sortedUniqueAliTasks = tasks.filtered(
      // :code-block-start: sort-distinct-limit
      "assignee = 'Ali' SORT(priority DESC) DISTINCT(name) LIMIT(5)"
      // :code-block-end:
    );
    expect(sortedUniqueAliTasks.length).toBe(1);
  });

  test("subquery queries", () => {
    const projects = realm.objects("Project");
    const subquery = projects.filtered(
      // :code-block-start: subquery
      "SUBQUERY(tasks, $task, $task.isComplete == false AND $task.assignee == 'Alex').@count > 0"
      // :code-block-end:
    );
    expect(subquery.length).toBe(0);
  });

  test("predicate substitution", () => {
    const tasks = realm.objects("Task");

    const substitution = tasks.filtered(
      // :code-block-start: predicate
      "progressMinutes > 1 AND assignee == $0",
      "Ali"
      // :code-block-end:
    );
    expect(substitution.length).toBe(1);
  });
});
