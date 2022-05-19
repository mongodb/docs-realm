import Realm from "realm";

const Project = {
  name: "Project",
  properties: {
    name: "string",
    tasks: "Task[]",
    quota: "int?",
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
        tasks: [
          {
            name: "Write tests",
            isComplete: false,
            assignee: "Alex",
            priority: 5,
            progressMinutes: 125,
          },
          {
            name: "Run tests",
            isComplete: false,
            assignee: "Ali",
            priority: 9,
            progressMinutes: 10,
          },
          {
            name: "Bluehawk Tests",
            isComplete: false,
            assignee: null,
            priority: 10,
            progressMinutes: 55,
          },
        ],
      });
    });

    expect(realm.objects("Project")[0].name).toBe("New Project");
    expect(realm.objects("Task")[0].name).toBe("Write tests");
  });

  afterEach(() => {
    // After the test, delete the objects and close the realm
    if (realm && !realm.isClosed) {
      realm.write(() => {
        realm.deleteAll();
      });
      // realm.close();
    }
  });

  test("comparison queries", () => {
    const tasks = realm.objects("Task");

    const highPriorityTasks = tasks.filtered(
      // :snippet-start: comparison-operators
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
      // :snippet-end:
    );
    expect(progressMinutesRange.length).toBe(1);
  });

  test("logic queries", () => {
    const tasks = realm.objects("Task");
    const projects = realm.objects("Project");

    const aliComplete = tasks.filtered(
      // :snippet-start: logical-operators
      "assignee == 'Ali' AND isComplete == true"
      // :snippet-end:
    );
    expect(aliComplete.length).toBe(0);

    // :snippet-start: string-operators
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
      // :snippet-end:
    );
    expect(containIe.length).toBe(0);
  });

  test("aggregate queries", () => {
    const projects = realm.objects("Project");
    const averageTaskPriorityAbove5 = projects.filtered(
      // :snippet-start: aggregate-operators
      "tasks.@avg.priority > 5"
      // :hide-start:
    );
    expect(averageTaskPriorityAbove5.length).toBe(1);

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
      // :snippet-end:
    );
    expect(longRunningProjects.length).toBe(1);
  });

  test("collection queries", () => {
    const projects = realm.objects("Project");
    const noCompleteTasks = projects.filtered(
      // :snippet-start: set-operators
      "NONE tasks.isComplete == true"
      // :hide-start:
    );
    expect(noCompleteTasks.length).toBe(1);

    const anyTopPriorityTasks = projects.filtered(
      // :hide-end:

      "ANY tasks.priority == 10"
      // :snippet-end:
    );
    expect(anyTopPriorityTasks.length).toBe(1);
  });

  test("sort, distinct and limit queries", () => {
    const tasks = realm.objects("Task");

    const sortedUniqueAliTasks = tasks.filtered(
      // :snippet-start: sort-distinct-limit
      "assignee = 'Ali' SORT(priority DESC) DISTINCT(name) LIMIT(5)"
      // :snippet-end:
    );
    expect(sortedUniqueAliTasks.length).toBe(1);
  });

  test("subquery queries", () => {
    realm.write(() => {
      realm.create("Project", {
        name: "Project with Quota",
        quota: 2,
        tasks: [
          {
            name: "Write tests",
            isComplete: true,
            assignee: "Alex",
            priority: 5,
            progressMinutes: 125,
          },
          {
            name: "Run tests",
            isComplete: true,
            assignee: "Ali",
            priority: 9,
            progressMinutes: 10,
          },
          {
            name: "Bluehawk Tests",
            isComplete: false,
            assignee: null,
            priority: 10,
            progressMinutes: 55,
          },
        ],
      });
    });
    const projects = realm.objects("Project");
    const subquery = projects.filtered(
      // :snippet-start: subquery
      "SUBQUERY(tasks, $task, $task.isComplete == false AND $task.assignee == 'Alex').@count > 0"
      // :hide-start:
    );
    expect(subquery.length).toBe(1);
    expect(subquery[0].name).toBe("New Project");

    const subquery2 = projects.filtered(
      // :hide-end:

      "SUBQUERY(tasks, $task, $task.isComplete == true).@count >= quota"
      // :snippet-end:
    );
    expect(subquery2.length).toBe(1);
    expect(subquery2[0].name).toBe("Project with Quota");
  });

  test("predicate substitution", () => {
    const tasks = realm.objects("Task");

    const substitution = tasks.filtered(
      // :snippet-start: predicate
      "progressMinutes > 1 AND assignee == $0",
      "Ali"
      // :snippet-end:
    );
    expect(substitution.length).toBe(1);
  });
});
