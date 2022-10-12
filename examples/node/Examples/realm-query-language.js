import Realm, { BSON } from "realm";
import { TaskModel, ProjectModel } from "./schemas/rql-data-models";

describe("Realm Query Language Reference", () => {
  let realm;
  beforeEach(async () => {
    realm = await Realm.open({
      schema: [ProjectModel, TaskModel],
      deleteRealmIfMigrationNeeded: true,
    });

    // populate test objects
    realm.write(() => {
      realm.create("Project", {
        id: new Realm.BSON.ObjectId(),
        name: "New Project",
        tasks: [
          {
            id: new Realm.BSON.ObjectId(),
            name: "Write tests",
            isComplete: false,
            assignee: "Alex",
            priority: 5,
            progressMinutes: 125,
          },
          {
            id: new Realm.BSON.ObjectId(),
            name: "Run tests",
            isComplete: false,
            assignee: "Ali",
            priority: 9,
            progressMinutes: 10,
          },
          {
            id: new Realm.BSON.ObjectId(),
            name: "Bluehawk Tests",
            isComplete: false,
            assignee: null,
            priority: 10,
            progressMinutes: 55,
          },
        ],
      });
      const proj1 = realm.create("Project", {
        id: new Realm.BSON.ObjectId(),
        name: "Project with High Quota",
        quota: 12,
        tasks: [
          {
            id: new Realm.BSON.ObjectId(),
            name: "Create a ticket",
            isComplete: true,
            assignee: "Nick",
            priority: 2,
            progressMinutes: 8,
          },
          {
            id: new Realm.BSON.ObjectId(),
            name: "Schedule a meeting",
            isComplete: true,
            assignee: "Chris",
            priority: 9,
            progressMinutes: 10,
          },
          {
            id: new Realm.BSON.ObjectId(),
            name: "Get coffee",
            isComplete: false,
            assignee: "Dachary",
            priority: 11,
            progressMinutes: 3,
          },
        ],
      });

      const proj2 = realm.create("Project", {
        id: new Realm.BSON.ObjectId(),
        name: "Another project",
        tasks: [proj1.tasks[2]],
      });

      realm.create("Task", {
        id: new Realm.BSON.ObjectId(),
        name: "Assign me to a project",
        isComplete: false,
        assignee: "Nick",
        priority: 2,
        progressMinutes: 0,
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

  test("simple query example", () => {
    // :snippet-start: simple-query
    const tasks = realm.objects("Task");
    // Gets all tasks where the 'priority' property is 7 or more.
    const importantTasks = tasks.filtered("priority >= 7");
    // :snippet-end:
    expect(importantTasks.length).toBeGreaterThan(0);
  });
  test("comparison queries", () => {
    const tasks = realm.objects("Task");

    const highPriorityTasks = tasks.filtered(
      // :snippet-start: comparison-operators
      "priority > 5"
      // :remove-start:
    );
    expect(highPriorityTasks.length).toBe(4);

    const longRunningTasks = tasks.filtered(
      // :remove-end:

      "progressMinutes > 120"
      // :remove-start:
    );
    expect(longRunningTasks.length).toBe(1);

    const unassignedTasks = tasks.filtered(
      // :remove-end:

      "assignee == nil"
      // :remove-start:
    );
    expect(unassignedTasks.length).toBe(1);

    const progressMinutesRange = tasks.filtered(
      // :remove-end:

      "progressMinutes BETWEEN { 30,60 }"
      // :remove-start:
    );
    expect(progressMinutesRange.length).toBe(1);

    const progressMinutesIn = tasks.filtered(
      // :remove-end:

      "progressMinutes IN { 10, 20, 30, 40, 50, 60 }"
      // :snippet-end:
    );
    expect(progressMinutesIn.length).toBe(2);
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
    // :remove-start:
    const startWithE = projects.filtered(
      // :remove-end:
      "name BEGINSWITH[c] 'e'"
      // :remove-start:
    );
    expect(startWithE.length).toBe(0);

    const containIe = projects.filtered(
      // :remove-end:

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
      // :remove-start:
    );
    expect(averageTaskPriorityAbove5.length).toBe(3);

    const allTasksLowerPriority = projects.filtered(
      // :remove-end:

      "tasks.@max.priority < 5"
      // :remove-start:
    );
    expect(allTasksLowerPriority.length).toBe(0);

    const allTasksHighPriority = projects.filtered(
      // :remove-end:

      "tasks.@min.priority > 5"
      // :remove-start:
    );
    expect(allTasksHighPriority.length).toBe(1);

    const moreThan5Tasks = projects.filtered(
      // :remove-end:

      "tasks.@count > 5"
      // :remove-start:
    );
    expect(moreThan5Tasks.length).toBe(0);

    const longRunningProjects = projects.filtered(
      // :remove-end:

      "tasks.@sum.progressMinutes > 100"
      // :snippet-end:
    );
    expect(longRunningProjects.length).toBe(1);
  });

  test("collection queries", () => {
    const projects = realm.objects("Project");
    const noCompleteTasks = projects.filtered(
      // :snippet-start: set-operators
      // Projects with no complete tasks.
      "NONE tasks.isComplete == true"
      // :remove-start:
    );

    const anyTopPriorityTasks = projects.filtered(
      // :remove-end:

      // Projects that contain a task with priority 10
      "ANY tasks.priority == 10"
      // :remove-start:
    );
    const allTasksCompleted = projects.filtered(
      // :remove-end:

      // Projects that only contain completed tasks
      "ALL tasks.isComplete == true"
      // :remove-start:
    );
    const assignedToAlexOrAli = projects.filtered(
      // :remove-end:

      // Projects with at least one task assigned to either Alex or Ali
      "ANY tasks.assignee IN { 'Alex', 'Ali' }"
      // :remove-start:
    );
    const notAssignedToAlexOrAli = projects.filtered(
      // :remove-end:

      // Projects with no tasks assigned to either Alex or Ali
      "NONE tasks.assignee IN { 'Alex', 'Ali' }"
      // :snippet-end:
    );
    expect(noCompleteTasks.length).toBe(2);
    expect(anyTopPriorityTasks.length).toBe(1);
    expect(allTasksCompleted.length).toBe(0);
    expect(assignedToAlexOrAli.length).toBe(1);
    expect(notAssignedToAlexOrAli.length).toBe(2);
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

  test("list comparisons", () => {
    realm.write(() => {
      realm.create("Project", {
        id: new Realm.BSON.ObjectId(),
        name: "List Query Project",
        tasks: [
          {
            id: new BSON.ObjectId("631a072f75120729dc9223d9"),
            name: "Do the dishes",
            isComplete: true,
            assignee: "Kim",
            priority: 5,
            progressMinutes: 32,
          },
          {
            id: new BSON.ObjectId("631a0737c98f89f5b81cd24d"),
            name: "Take out the trash",
            isComplete: false,
            assignee: "Tom",
            priority: 2,
            progressMinutes: 0,
          },
          {
            id: new BSON.ObjectId("631a073c833a34ade21db2b2"),
            name: "Feed the cat",
            isComplete: false,
            assignee: "Anna",
            priority: 10,
            progressMinutes: 0,
          },
        ],
      });
    });
    const projects = realm.objects("Project");
    const tasks = realm.objects("Task");

    const collectionQuery = projects.filtered(
      // :snippet-start: list-comparisons-collection
      "oid(631a072f75120729dc9223d9) IN tasks.id"
      // :snippet-end:
    );
    const staticQuery = tasks.filtered(
      // :snippet-start: list-comparisons-static
      "priority IN {0, 1, 2}"
      // :snippet-end:
    );
    // :snippet-start: list-comparisons-parameterized
    const ids = [
      new BSON.ObjectId("631a072f75120729dc9223d9"),
      new BSON.ObjectId("631a0737c98f89f5b81cd24d"),
      new BSON.ObjectId("631a073c833a34ade21db2b2"),
    ];
    const parameterizedQuery = realm.objects("Task").filtered("id IN $0", ids);
    // :snippet-end:

    expect(collectionQuery.length).toBe(1);
    expect(staticQuery.length).toBe(3);
    expect(parameterizedQuery.length).toBe(3);
  });

  describe("Backlink queries", () => {
    test("dot-notation", () => {
      const linkingObjectsResult = realm.objects("Task").filtered(
        // :snippet-start: backlinks
        // Find tasks that belong to a project with a quota greater than 10 (LinkingObjects)
        "projects.quota > 10"
        // :remove-start:
      );
      expect(linkingObjectsResult.length).toBe(3);
      expect(linkingObjectsResult[0].name).toBe("Create a ticket");

      const atLinksResult = realm.objects("Task").filtered(
        // :remove-end:
        // Find tasks that belong to a project with a quota greater than 10 (@links)
        "@links.Project.tasks.quota > 10"
        // :remove-start:
      );
      expect(atLinksResult.length).toBe(3);
      expect(atLinksResult[0].name).toBe("Create a ticket");
    });

    test("collection operators", () => {
      const anyResult = realm.objects("Task").filtered(
        // :remove-end:
        // Find tasks where any project that references the task has a quota greater than 0
        "ANY @links.Project.tasks.quota > 0"
        // :remove-start:
      );
      expect(anyResult.length).toBe(3);
      expect(anyResult[0].name).toBe("Create a ticket");

      const allResult = realm.objects("Task").filtered(
        // :remove-end:
        // Find tasks where all projects that reference the task have a quota greater than 0
        "ALL @links.Project.tasks.quota > 0"
        // :remove-start:
      );
      expect(allResult.length).toBe(3);
      expect(allResult[0].name).toBe("Create a ticket");
    });

    test("aggregate operators (linkingObjects)", () => {
      const shallowResultLinkingObjects = realm.objects("Task").filtered(
        // :remove-end:
        // Find tasks that are referenced by multiple projects
        "projects.@count > 1"
        // :remove-start:
      );
      expect(shallowResultLinkingObjects.length).toBe(1);
      expect(shallowResultLinkingObjects[0].name).toBe("Get coffee");
      
      const shallowResultAtLinks = realm.objects("Task").filtered(
        // :remove-end:
        // Find tasks that are not referenced by any project
        "@links.Project.tasks.@count == 0"
        // :remove-start:
      );
      expect(shallowResultAtLinks.length).toBe(1);
      expect(shallowResultAtLinks[0].name).toBe("Assign me to a project");

      const deepResultAtLinks = realm.objects("Task").filtered(
        // :remove-end:
        // Find tasks that belong to a project where the average task has
        // been worked on for at least 5 minutes
        "@links.Project.tasks.tasks.@avg.progressMinutes > 10"
        // :remove-start:
      );
      expect(deepResultAtLinks.length).toBe(3);
      expect(deepResultAtLinks[0].name).toBe("Write tests");
    });

    test("all backlinks (@links)", () => {
      const result = realm.objects("Task").filtered(
        // :remove-end:
        // Find tasks that are not referenced by another object of any type
        "@links.@count == 0"
        // :snippet-end:
      );
      expect(result.length).toBe(1);
      expect(result[0].name).toBe("Assign me to a project");
    });
  });

  test("subquery queries", () => {
    realm.write(() => {
      realm.create("Project", {
        id: new Realm.BSON.ObjectId(),
        name: "Project with Quota",
        quota: 2,
        tasks: [
          {
            id: new Realm.BSON.ObjectId(),
            name: "Write tests",
            isComplete: true,
            assignee: "Alex",
            priority: 5,
            progressMinutes: 125,
          },
          {
            id: new Realm.BSON.ObjectId(),
            name: "Run tests",
            isComplete: true,
            assignee: "Ali",
            priority: 9,
            progressMinutes: 10,
          },
          {
            id: new Realm.BSON.ObjectId(),
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
      // Returns projects with tasks that have not been completed
      // by a user named Alex.
      "SUBQUERY(tasks, $task, $task.isComplete == false AND $task.assignee == 'Alex').@count > 0"
      // :remove-start:
    );
    expect(subquery.length).toBe(1);
    expect(subquery[0].name).toBe("New Project");

    const subquery2 = projects.filtered(
      // :remove-end:

      // Returns the projects where the number of completed tasks is
      // greater than or equal to the value of a project's `quota` property.
      "SUBQUERY(tasks, $task, $task.isComplete == true).@count >= quota"
      // :snippet-end:
    );
    expect(subquery2.length).toBe(1);
    expect(subquery2[0].name).toBe("Project with Quota");
  });

  test("predicate substitution", () => {
    const tasks = realm.objects("Task");

    // prettier-ignore
    const substitution = tasks.filtered(
      // :snippet-start: predicate
      "progressMinutes > 1 AND assignee == $0", "Ali"
      // :snippet-end:
    );
    expect(substitution.length).toBe(1);
  });

  test("multiple predicate substitution", () => {
    const tasks = realm.objects("Task");

    // prettier-ignore
    const substitution = tasks.filtered(
      // :snippet-start: multiple-predicate
      "progressMinutes > $0 AND assignee == $1", 1, "Alex"
      // :snippet-end:
    );
    expect(substitution.length).toBe(1);
  });
  test("Basic arithmetic", () => {
    const tasks = realm.objects("Task");
    const basicMath = tasks.filtered(
      // :snippet-start: basic-arithmetic
      "2 * priority > 6"
      // :remove-start:
    );
    const lessBasicMath = tasks.filtered(
      // :remove-end:
      // Is equivalent to
      "priority >= 2 * (2 - 1) + 2"
      // :snippet-end:
    );

    expect(basicMath.length).toBe(5);
    expect(lessBasicMath.length).toBe(5);
  });
  test("Arithmetic with object properties", () => {
    const tasks = realm.objects("Task");
    const mathWithObjProps = tasks.filtered(
      // :snippet-start: arithmetic-obj-properties
      "progressMinutes * priority == 90"
      // :snippet-end:
    );
    expect(mathWithObjProps.length).toBe(2);
  });

  describe("ObjectId and UUID tests", () => {
    const OidUuid = {
      name: "OidUuid",
      properties: { id: "uuid", _id: "objectId" },
    };
    let realm;
    const path = "oidUuid.realm";
    const oidValueString = "6001c033600510df3bbfd864";
    const uuid1String = "d1b186e1-e9e0-4768-a1a7-c492519d47ee";
    const oidValue = new Realm.BSON.ObjectId(oidValueString);
    const uuid1 = new Realm.BSON.UUID(uuid1String);
    beforeAll(async () => {
      realm = await Realm.open({ schema: [OidUuid], path });
      const obj1 = {
        _id: oidValue,
        id: uuid1,
      };
      const obj2 = {
        _id: new Realm.BSON.ObjectId(),
        id: new Realm.BSON.UUID(),
      };
      realm.write(() => {
        realm.create("OidUuid", obj1);
        realm.create("OidUuid", obj2);
      });
    });
    afterAll(() => {
      realm.close();
      Realm.deleteFile({ path });
    });

    test("ObjectId Operator", () => {
      const oidUuids = realm.objects("OidUuid");
      const oidStringLiteral = oidUuids.filtered(
        // :snippet-start: oid
        "_id == oid(6001c033600510df3bbfd864)"
        // :snippet-end:
      );
      // prettier-ignore
      const oidInterpolation = oidUuids.filtered(
        // :snippet-start:oid-literal
        "_id == $0", oidValue
        // :snippet-end:
      );

      expect(oidStringLiteral.length).toBe(1);
      expect(oidInterpolation.length).toBe(1);
    });
    test("UUID Operator", () => {
      const oidUuids = realm.objects("OidUuid");
      const uuid = oidUuids.filtered(
        // :snippet-start: uuid
        "id == uuid(d1b186e1-e9e0-4768-a1a7-c492519d47ee)"
        // :snippet-end:
      );
      expect(uuid.length).toBe(1);
    });
  });
  describe("Dot notation", () => {
    const Address = {
      name: "Address",
      properties: { zipcode: "int" },
    };
    const Workplace = {
      name: "Workplace",
      properties: { address: "Address" },
    };
    const Employee = {
      name: "Employee",
      properties: { name: "string", workplace: "Workplace" },
    };

    let realm;
    const path = "employee.realm";
    beforeAll(async () => {
      realm = await Realm.open({
        schema: [Employee, Address, Workplace],
        path,
      });
      realm.write(() => {
        realm.create("Employee", {
          name: "Homer",
          workplace: {
            address: {
              zipcode: 10019,
            },
          },
        });
      });
    });
    afterAll(() => {
      realm.close();
      Realm.deleteFile({ path });
    });
    test("Deeply nested dot notation", () => {
      const employees = realm.objects("Employee");
      const deeplyNestedMatch = employees.filtered(
        // :snippet-start: deep-dot-notation
        "workplace.address.zipcode == 10019"
        // :snippet-end:
      );
      expect(deeplyNestedMatch.length).toBe(1);
    });
  });
  test("Nil type", () => {
    const name = "take a loooong nap";
    const takeANap = {
      id: new BSON.ObjectId(),
      name,
      isComplete: false,
      priority: 1,
      progressMinutes: 12,
    };
    realm.write(() => {
      realm.create("Task", takeANap);
    });
    const res = realm.objects("Task").filtered(
      // :snippet-start: nil-type
      "assignee == nil"
      // :snippet-end:
    );

    // prettier-ignore
    const res2 = realm.objects("Task").filtered(
      // :snippet-start: nil-type-parameterized-query
      // comparison to language null pointer
      "assignee == $0", null
      // :snippet-end:
    );

    expect(res.filter(({ name: objName }) => objName === name).length).toBe(1);
    expect(res2.filter(({ name: objName }) => objName === name).length).toBe(1);
  });
  describe("Type operator", () => {
    const Mixed = {
      name: "Mixed",
      properties: { name: "string", mixedType: "mixed" },
    };

    let realm;
    const path = "mixed.realm";
    beforeAll(async () => {
      realm = await Realm.open({
        schema: [Mixed],
        path,
      });
      realm.write(() => {
        realm.create("Mixed", {
          name: "Marge",
          mixedType: true,
        });
        realm.create("Mixed", {
          name: "Lisa",
          mixedType: 22,
        });
        realm.create("Mixed", {
          name: "Bart",
          mixedType: "carrumba",
        });
      });
    });
    afterAll(() => {
      realm.close();
      Realm.deleteFile({ path });
    });
    test("Type operator", () => {
      const mixed = realm.objects("Mixed");
      const mixedString = mixed.filtered(
        // :snippet-start: type-operator
        "mixedType.@type == 'string'"
        // :remove-start:
      );
      const mixedBool = mixed.filtered(
        // :remove-end:

        "mixedType.@type == 'bool'"
        // :snippet-end:
      );
      expect(mixedString.length).toBe(1);
      expect(mixedBool.length).toBe(1);
    });
  });
  describe("Date operators", () => {
    const Datetime = {
      name: "Date",
      properties: { name: "string", timeCompleted: "date" },
    };

    let realm;
    const path = "date.realm";
    beforeAll(async () => {
      realm = await Realm.open({
        schema: [Datetime],
        path,
      });
      realm.write(() => {
        realm.create("Date", {
          name: "now",
          timeCompleted: new Date(),
        });
        realm.create("Date", {
          name: "after",
          timeCompleted: new Date(),
        });
        realm.create("Date", {
          name: "past",
          timeCompleted: new Date("December 17, 1985 03:24:00"),
        });
      });
    });
    afterAll(() => {
      realm.close();
      Realm.deleteFile({ path });
    });
    test("Date operators", () => {
      const dates = realm.objects("Date");
      const someDate = new Date("December 17, 2011 03:24:00");

      // prettier-ignore
      const dateParameterizedQuery = dates.filtered(
        // :snippet-start: date-parameterized-query
        "timeCompleted < $0", someDate
        // :snippet-end:
      );

      const dateAlt1 = dates.filtered(
        // :snippet-start: date-alt-representation
        "timeCompleted > 2021-02-20@17:30:15:0"
        // :remove-start:
      );
      const dateAlt2 = dates.filtered(
        // :remove-end:
        "timeCompleted > 2021-02-20@17:30:15:0"
        // :snippet-end:
      );

      expect(dateParameterizedQuery.length).toBe(1);
      expect(dateAlt1.length).toBe(2);
      expect(dateAlt2.length).toBe(2);
    });
  });
  describe("Dictionary operators", () => {
    const Dictionary = {
      name: "Dictionary",
      properties: { dict: "{}" },
    };

    let realm;
    const path = "dictionary.realm";
    beforeAll(async () => {
      realm = await Realm.open({
        schema: [Dictionary],
        path,
      });
      realm.write(() => {
        realm.create("Dictionary", {
          dict: {
            foo: "bar",
          },
        });
        realm.create("Dictionary", {
          dict: {
            isTrue: false,
          },
        });
        realm.create("Dictionary", {
          dict: {
            baz: "Biz",
            num: 1.0, // Note: Realm treats this as a double internally
          },
        });
      });
    });
    afterAll(() => {
      realm.close();
      Realm.deleteFile({ path });
    });
    test("Dictionary operators", () => {
      const dictionaries = realm.objects("Dictionary");

      const fooKey = dictionaries.filtered(
        // :snippet-start: dictionary-operators
        // Evaluates if there is a dictionary key with the name 'foo'
        "ANY dict.@keys == 'foo'"

        // :remove-start:
      );
      const fooBarKeyValue = dictionaries.filtered(
        // :remove-end:
        // Evaluates if there is a dictionary key with key 'foo' and value 'bar
        "dict['foo'] == 'bar'"

        // :remove-start:
      );

      const numItemsInDict = dictionaries.filtered(
        // :remove-end:
        // Evaluates if there is a dictionary key with key 'foo' and value 'bar
        "dict.@count > 1"

        // :remove-start:
      );

      const hasString = dictionaries.filtered(
        // :remove-end:
        // Evaluates if dictionary has property of type 'string'
        "ANY dict.@type == 'string'"

        // :remove-start:
      );

      // TODO: fails, unsure why
      const allBool = dictionaries.filtered(
        // :remove-end:
        // Evaluates if all the dictionary's values are integers
        "ALL dict.@type == 'bool'"

        // :remove-start:
      );

      // TODO: fails, unsure why
      const noFloats = dictionaries.filtered(
        // :remove-end:
        // Evaluates if dictionary does not have any values of type int
        "NONE dict.@type == 'double'"

        // :remove-start:
      );

      // TODO: fails, unsure why
      const allStringNoKeyWord = dictionaries.filtered(
        // :remove-end:
        // ANY is implied.
        "dict.@type == 'string'"
        // :snippet-end:
      );

      expect(fooKey.length).toBe(1);
      expect(fooBarKeyValue.length).toBe(1);
      expect(numItemsInDict.length).toBe(1);
      expect(hasString.length).toBe(2);
      expect(allBool.length).toBe(1);
      expect(noFloats.length).toBe(2);
      expect(allStringNoKeyWord.length).toBe(2);
    });
  });
});
