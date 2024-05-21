/* eslint-disable prettier/prettier */
import Realm, { BSON } from "realm";
import { Address, Item, Office, Project } from "./models/rql-data-models.ts";
import { describe, expect } from "@jest/globals";

describe("Realm Query Language Reference", () => {
  let realm;
  const config = { schema: [Project, Item, Address, Office] };

  beforeEach(async () => {
    // Before each test, open the realm and create project & item objects:
    // 2 branches w/ 2 addresses; 3 projects; and
    // 6 items (one used in 2 projects, another in 0 projects)
    realm = await Realm.open(config);

    const mainBranch = {
      name: "Main Branch",
      address: {
        name: "Main Branch",
        street: "123 Main St",
        zipcode: 10019,
      },
    };
    const austinBranch = {
      name: "Austin Branch",
      address: {
        name: "Austin Branch",
        street: "123 Main Ave",
        zipcode: 10019,
      },
    };
    realm.write(() => {
      realm.create(Item, {
        // Unassigned incomplete item not in any project
        _id: new BSON.ObjectId("631a073c833a34ade21db2b2"),
        name: "Write tests",
        isComplete: false,
        assignee: null,
        priority: 10,
        progressMinutes: 0,
      });

      realm.create(Project, {
        _id: new BSON.ObjectId(),
        name: "Example Project with Items",
        items: [
          {
            // Alex incomplete item
            _id: new BSON.ObjectId("631a072f75120729dc9223d9"),
            name: "Write tests",
            isComplete: false,
            assignee: "Alex",
            priority: 5,
            progressMinutes: 125,
          },
          {
            // Ali incomplete item
            _id: new BSON.ObjectId("631a0737c98f89f5b81cd24d"),
            name: "Run tests",
            isComplete: false,
            assignee: "Ali",
            priority: 9,
            progressMinutes: 10,
          },
        ],
        quota: 1, // doesn't meet quota
        comments: { status: "Behind schedule", projectNumber: "70150" },
        projectLocation: mainBranch,
      });
      const project = realm.create(Project, {
        _id: new BSON.ObjectId(),
        name: "Project that Meets Quota",
        items: [
          {
            //  Complete item used in 2 projects
            _id: new BSON.ObjectId(),
            name: "Approve project plan",
            isComplete: true,
            assignee: "Dachary",
            priority: 1,
            progressMinutes: 0,
          },
          {
            // Complete high-priority item
            _id: new BSON.ObjectId(),
            name: "Create a ticket",
            isComplete: true,
            assignee: "Chris",
            priority: 9,
            progressMinutes: 10,
          },
          {
            // Incomplete high-priority item
            _id: new BSON.ObjectId(),
            name: "Demo template app",
            isComplete: false,
            assignee: "Dachary",
            priority: 11,
            progressMinutes: 3,
          },
        ],
        quota: 1, // meets quota
        comments: { status: "Ahead of schedule", projectNumber: "70187" },
        projectLocation: mainBranch,
      });

      realm.create(Project, {
        _id: new BSON.ObjectId(),
        name: "Project in Austin",
        items: [
          project.items[0],
          {
            // Incomplete high-priority item assigned to `nil` type
            _id: new BSON.ObjectId(),
            name: "Lead offsite workshop",
            isComplete: false,
            assignee: "nil",
            priority: 10,
            progressMinutes: 0,
          },
        ],
        quota: 11, // doesn't meet quota
        comments: { status: "On track", projectNumber: "N/A" },
        projectLocation: austinBranch,
      });
    });
  });

  afterEach(() => {
    // After the test, delete the objects and close the realm
    if (realm && !realm.isClosed) {
      realm.write(() => {
        realm.deleteAll();
      });
      realm.close();
      expect(realm.isClosed).toBe(true);
    }
  });

  afterAll(() => {
    Realm.deleteFile(config);
  });

  test("Can open realm and create objects", async () => {
    expect(realm.isClosed).toBe(false);
    expect(realm.objects(Project)[0].name).toBe("Example Project with Items");
    expect(realm.objects(Item)[0].name).toBe("Write tests");
  });

  test("Simple query", () => {
    // NOTE: snippet used on Node.js Query Data page, not RQL page
    // :snippet-start: simple-query
    const items = realm.objects(Item);
    // Get all items where 'priority' property is 7 or more.
    const importantItems = items.filtered("priority >= $0", 7);
    // :snippet-end:
    expect(importantItems.length).toEqual(5);
  });

  describe("Basic syntax", () => {
    test("Expression query", () => {
      const items = realm.objects(Item);
      // :snippet-start: predicate
      const expression = "priority == 1";
      // :snippet-end:
      expect(items.filtered(expression).length).toBe(1);
    });
    test("Serialized query", () => {
      const items = realm.objects(Item);
      const query = items.filtered(
        // :snippet-start: serialized-query
        "progressMinutes > 1 AND assignee == 'Ali'"
        // :snippet end:
      );
      expect(query.length).toBe(1);
    });
    test("Parameterized query", () => {
      const items = realm.objects(Item);
      const substitution = items.filtered(
        // :snippet-start: parameterized-query
        // Include one parameter with `$0`.
        "progressMinutes > 1 AND assignee == $0",
        "Ali"
        // :remove-start:
      );
      expect(substitution.length).toBe(1);
    });

    test("Multiple parameterized query", () => {
      const items = realm.objects(Item);
      const substitution = items.filtered(
        // :remove-end:

        // Include multiple parameters using ascending integers,
        // starting at`$0`.
        "progressMinutes > $0 AND assignee == $1",
        1,
        "Alex"
        // :snippet-end:
      );
      expect(substitution.length).toBe(1);
    });

    test("Dot notation", () => {
      const address = realm.objects(Project);
      const nestedMatch = address.filtered(
        // :snippet-start: deep-dot-notation
        "projectLocation.address.zipcode == 10019"
        // :snippet-end:
      );
      expect(nestedMatch.length).toBe(3);
    });
  });

  test("Comparison operators", () => {
    const items = realm.objects(Item);

    const highPriorityItems = items.filtered(
      // :snippet-start: comparison-operators
      // Find high-priority to-do items:
      // Compare `priority` values against a threshold value,
      // above which is considered high.
      "priority > $0",
      5
      // :remove-start:
    );
    expect(highPriorityItems.length).toBe(5);

    const longRunningItems = items.filtered(
      // :remove-end:

      // Find long-running to-do items:
      // Compare `progressMinutes` values against a threshold value,
      // where items at or above are considered long running.
      "progressMinutes > $0",
      120
      // :remove-start:
    );
    expect(longRunningItems.length).toBe(1);

    const unassignedItems = items.filtered(
      // :remove-end:

      // Find unassigned to-do items:
      // Compare `assignee` values to `null` value.
      "assignee == $0",
      null
      // :remove-start:
    );
    expect(unassignedItems.length).toBe(1);

    const progressMinutesRange = items.filtered(
      // :remove-end:

      // Find low-priority to-do items:
      // Compare `priority` values against an inclusive range of values.
      "priority BETWEEN { $0 , $1 }",
      1,
      5
      // :remove-start:
    );
    expect(progressMinutesRange.length).toBe(2);

    const progressMinutesIn = items.filtered(
      // :remove-end:

      // Find to-do items with specific progress times:
      // Compare `progressMinutes` values against any of the listed values.
      "progressMinutes IN { $0, $1, $2 }",
      10,
      30,
      60
      // :snippet-end:
    );
    expect(progressMinutesIn.length).toBe(2);
  });

  test("Logical operators", () => {
    const items = realm.objects(Item);
    const aliComplete = items.filtered(
      // :snippet-start: logical-operators
      // Find all to-do items assigned to Ali AND are completed.
      "assignee == $0 AND isComplete == $1",
      "Ali",
      true
      // :remove-start:
    );
    const alexOrAli = items.filtered(
      // :remove-end:
      // Find all to-do items assigned to Alex OR to Ali.
      "assignee == $0 OR assignee == $1",
      "Alex",
      "Ali"
      // :snippet-end:
    );
    expect(aliComplete.length).toBe(0);
    expect(alexOrAli.length).toBe(2);
  });

  describe("Arithmetic operators", () => {
    test("Basic arithmetic", () => {
      const items = realm.objects(Item);
      const basicMath = items.filtered(
        // :snippet-start: basic-arithmetic
        "2 * priority > 6"
        // :remove-start:
      );
      const lessBasicMath = items.filtered(
        // :remove-end:
        // Is equivalent to
        "priority >= 2 * (2 - 1) + 2"
        // :snippet-end:
      );

      expect(basicMath.length).toBe(6);
      expect(lessBasicMath.length).toBe(6);
    });

    test("Arithmetic with object properties", () => {
      const items = realm.objects(Item);
      const mathWithObjProps = items.filtered(
        // :snippet-start: arithmetic-obj-properties
        "progressMinutes * priority == 90"
        // :snippet-end:
      );
      expect(mathWithObjProps.length).toBe(2);
    });
  });

  describe("Type-specific operators", () => {
    test("String operators", () => {
      const projects = realm.objects(Project);
      const startWithE = projects.filtered(
        // :snippet-start: string-operators
        // Find projects whose name starts with the letter 'e' (case-insensitive).
        "name BEGINSWITH[c] $0",
        "e"
        // :remove-start:
      );
      expect(startWithE.length).toBe(1);

      const containIe = projects.filtered(
        // :remove-end:

        // Find projects whose name contains the letters 'ie' (case-sensitive).
        "name CONTAINS $0",
        "ie"
        // :snippet-end:
      );
      expect(containIe.length).toBe(0);
    });
  });

  test("Aggregate queries", () => {
    const projects = realm.objects(Project);

    // :snippet-start: aggregate-operators
    var priorityNum = 5;

    // :remove-start:
    const averageItemPriorityAbove5 = projects.filtered(
      // :remove-end:
      // Find projects with average item `priority` above 5.
      "items.@avg.priority > $0",
      priorityNum
      // :remove-start:
    );
    expect(averageItemPriorityAbove5.length).toBe(3);

    const allItemsLowerPriority = projects.filtered(
      // :remove-end:

      // Find projects with a maximum `priority` of 5 (all items must be less
      // than 5).
      "items.@max.priority < $0",
      priorityNum
      // :remove-start:
    );
    expect(allItemsLowerPriority.length).toBe(0);

    const allItemsHighPriority = projects.filtered(
      // :remove-end:

      // Find projects with a minimum `priority` of 5 (all items must be greater
      // than 5).
      "items.@min.priority > $0",
      priorityNum
      // :remove-start:
    );
    expect(allItemsHighPriority.length).toBe(0);

    const moreThan5Items = projects.filtered(
      // :remove-end:

      // Find projects with more than 5 items.
      "items.@count > $0",
      5
      // :remove-start:
    );
    expect(moreThan5Items.length).toBe(0);

    const longRunningProjects = projects.filtered(
      // :remove-end:

      // Find projects with item `progressMinutes` greater than 100.
      "items.@sum.progressMinutes > $0",
      100
      // :snippet-end:
    );
    expect(longRunningProjects.length).toBe(1);
  });

  describe("Collection queries", () => {
    test("Collection operators", () => {
      const projects = realm.objects(Project);
      const noCompleteItems = projects.filtered(
        // :snippet-start: set-operators
        // Projects with no complete items.
        "NONE items.isComplete == $0",
        true
        // :remove-start:
      );

      const anyTopPriorityItems = projects.filtered(
        // :remove-end:

        // Projects that contain an item with priority 10.
        "ANY items.priority == $0",
        10
        // :remove-start:
      );
      const allItemsCompleted = projects.filtered(
        // :remove-end:

        // Projects that only contain completed items.
        "ALL items.isComplete == $0",
        true
        // :remove-start:
      );
      const assignedToAlexOrAli = projects.filtered(
        // :remove-end:

        // Projects with at least one item assigned to either Alex or Ali.
        "ANY items.assignee IN { $0 , $1 }",
        "Alex",
        "Ali"
        // :remove-start:
      );
      const notAssignedToAlexOrAli = projects.filtered(
        // :remove-end:

        // Projects with no items assigned to either Alex or Ali.
        "NONE items.assignee IN { $0 , $1 }",
        "Alex",
        "Ali"
        // :snippet-end:
      );
      expect(noCompleteItems.length).toBe(1);
      expect(anyTopPriorityItems.length).toBe(1);
      expect(allItemsCompleted.length).toBe(0);
      expect(assignedToAlexOrAli.length).toBe(1);
      expect(notAssignedToAlexOrAli.length).toBe(2);
    });

    test("List comparisons", () => {
      realm.write(() => {});
      const projects = realm.objects(Project);
      const items = realm.objects(Item);

      const collectionQuery = projects.filtered(
        // :snippet-start: list-comparisons-collection
        "oid(631a072f75120729dc9223d9) IN items._id"
        // :snippet-end:
      );
      const staticQuery = items.filtered(
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
      const parameterizedQuery = realm.objects(Item).filtered("_id IN $0", ids);
      // :snippet-end:

      expect(collectionQuery.length).toBe(1);
      expect(staticQuery.length).toBe(1);
      expect(parameterizedQuery.length).toBe(3);
    });

    test("Sort, distinct, and limit results", () => {
      const items = realm.objects(Item);

      const sortedUniqueAliItems = items.filtered(
        // :snippet-start: sort-distinct-limit
        "assignee == 'Ali' SORT(priority DESC) DISTINCT(name) LIMIT(5)"
        // :snippet-end:
      );
      expect(sortedUniqueAliItems.length).toBe(1);
    });

    test("Subquery queries", () => {
      const projects = realm.objects(Project);
      const subquery = projects.filtered(
        // :snippet-start: subquery
        // Find projects with incomplete to-do items assigned to Alex.
        "SUBQUERY(items, $item, $item.isComplete == false AND $item.assignee == 'Alex').@count > 0"
        // :snippet-end:
      );
      expect(subquery.length).toBe(1);
      expect(subquery[0].name).toBe("Example Project with Items");

      const subquery2 = projects.filtered(
        // :snippet-start: subquery-count
        // Find projects where the number of completed to-do items
        // is greater than or equal to the project's `quota` property.
        "SUBQUERY(items, $item, $item.isComplete == true).@count >= quota"
        // :snippet-end:
      );
      expect(subquery2.length).toBe(1);
      expect(subquery2[0].name).toBe("Project that Meets Quota");
    });

    test("Dictionary operators", () => {
      const dictionaries = realm.objects(Project);

      const statusKey = dictionaries.filtered(
        // :snippet-start: dictionary-operators
        // Finds `comments` dictionary properties with key 'status'
        "comments.@keys == $0",
        "status"

        // :remove-start:
      );
      const statusOnTrack = dictionaries.filtered(
        // :remove-end:
        // Find `comments` dictionary properties with key 'status'
        // and value 'On track'
        "comments['status'] == $0",
        "On track"
        // :remove-start:
      );
      const numItemsInDict = dictionaries.filtered(
        // :remove-end:
        // Finds `comments` dictionary properties with
        // more than one key-value pair
        "comments.@count > $0",
        1

        // :remove-start:
      );

      const hasString = dictionaries.filtered(
        // :remove-end:
        //Find `comments` dictionary properties where ANY
        // values are of type 'string`
        "ANY comments.@type == 'string'"
        // :remove-start:
      );

      const hasStringImplied = dictionaries.filtered(
        // :remove-end:
        "comments.@type == 'string'" // (Equivalent - ANY is implied.)

        // :remove-start:
      );

      const allInt = dictionaries.filtered(
        // :remove-end:
        // Finds `comments` dictionary properties where ALL
        // values are of type 'int'
        "ALL comments.@type == 'int'"

        // :remove-start:
      );

      const noInts = dictionaries.filtered(
        // :remove-end:
        // Finds `comments` dictionary properties where NO
        // values are of type 'int'
        "NONE comments.@type == 'int'"

        // :remove-start:
      );

      expect(statusKey.length).toBe(3);
      expect(statusOnTrack.length).toBe(1);
      expect(numItemsInDict.length).toBe(3);
      expect(hasString.length).toBe(3);
      expect(hasStringImplied.length).toBe(3);
      expect(allInt.length).toBe(0);
      expect(noInts.length).toBe(3);
    });
  });

  describe("Backlinks queries", () => {
    test("Backlinks query @links", () => {
      const atLinksResult = realm.objects(Item).filtered(
        // :snippet-start: backlinks-atLinks
        // Find items that belong to a project with a quota less than 10 (@links)
        "@links.Project.items.quota < 10"
        // :snippet-end:
      );
      expect(atLinksResult.length).toBe(5);

      const linkingObjectsResult = realm.objects(Item).filtered(
        // :snippet-start: backlinks-linkingObjects
        // Find items that belong to a project with a quota greater than 10 (LinkingObjects)
        "projects.quota > 10"
        // :snippet-end:
      );
      expect(linkingObjectsResult.length).toBe(2);
    });

    test("Backlinks collection operators", () => {
      const anyResult = realm.objects(Item).filtered(
        // :snippet-start: backlinks-collection-operators
        // Find items where any project that references the item has a quota greater than 10.
        "ANY @links.Project.items.quota > 10"
        // :remove-start:
      );
      expect(anyResult.length).toBe(2);

      const allResult = realm.objects(Item).filtered(
        // :remove-end:
        // Find items where all projects that reference the item have a quota
        // less than 5.
        "ALL @links.Project.items.quota < 5"
        // :snippet-end:
      );
      expect(allResult.length).toBe(5);
    });

    test("Backlinks aggregate operators", () => {
      const shallowResultLinkingObjects = realm.objects(Item).filtered(
        // :snippet-start: backlinks-aggregate-operators
        // Find items that are referenced by multiple projects
        "projects.@count > 1"
        // :remove-start:
      );
      expect(shallowResultLinkingObjects.length).toBe(1);
      expect(shallowResultLinkingObjects[0].name).toBe("Approve project plan");

      const shallowResultAtLinks = realm.objects(Item).filtered(
        // :remove-end:
        // Find items that are not referenced by any project
        "@links.Project.items.@count == 0"
        // :remove-start:
      );
      expect(shallowResultAtLinks.length).toBe(1);
      expect(shallowResultAtLinks[0].name).toBe("Write tests");

      const deepResultAtLinks = realm.objects(Item).filtered(
        // :remove-end:
        // Find items that belong to a project where the average item has
        // been worked on for at least 5 minutes
        "@links.Project.items.items.@avg.progressMinutes > 10"
        // :snippet-end:
      );
      expect(deepResultAtLinks.length).toBe(2);
      expect(deepResultAtLinks[0].name).toBe("Write tests");
    });

    test("Count all backlinks (@links.@count)", () => {
      const result = realm.objects(Item).filtered(
        // :snippet-start: backlinks-atCount
        // Find items that are not referenced by another object of any type
        "@links.@count == 0"
        // :snippet-end:
      );
      expect(result.length).toBe(1);
      expect(result[0].name).toBe("Write tests");
    });
  });

  describe("Type operator", () => {
    // Uses a test-specific schema with mixed type
    // TODO: Update main schema with mixed type property once collections-in-mixed is supported
    const Mixed = {
      name: "Mixed",
      properties: { name: "string", mixedType: "mixed" },
    };
    let realm;
    const path = "mixed.realm";

    // Add, then delete objects for this test
    beforeEach(async () => {
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

    afterEach(() => {
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

  test("Nil type", () => {
    const items = realm.objects(Item);
    const res = items.filtered(
      // :snippet-start: nil-type
      "assignee == nil"
      // :snippet-end:
    );

    const res2 = realm.objects(Item).filtered(
      // :snippet-start: nil-type-parameterized-query
      // comparison to language null pointer
      "assignee == $0",
      null
      // :snippet-end:
    );

    expect(res.length).toBe(1);
    expect(res2.length).toBe(1);
  });

  describe("ObjectId and UUID queries", () => {
    // Uses a test-specific schema with id types
    const OidUuid = {
      name: "OidUuid",
      properties: { id: "uuid", _id: "objectId" },
    };

    let realm;
    const path = "oidUuid.realm";

    const oidValueString = "6001c033600510df3bbfd864";
    const uuid1String = "d1b186e1-e9e0-4768-a1a7-c492519d47ee";
    const oidValue = new BSON.ObjectId(oidValueString);
    const uuid1 = new BSON.UUID(uuid1String);

    // Add, then delete objects for this test
    beforeEach(async () => {
      realm = await Realm.open({ schema: [OidUuid], path });
      const obj1 = {
        _id: oidValue,
        id: uuid1,
      };
      const obj2 = {
        _id: new BSON.ObjectId(),
        id: new BSON.UUID(),
      };
      realm.write(() => {
        realm.create("OidUuid", obj1);
        realm.create("OidUuid", obj2);
      });
    });

    afterEach(() => {
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
      const oidInterpolation = oidUuids.filtered(
        // :snippet-start:oid-literal
        "_id == $0",
        oidValue
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

  describe("Date queries", () => {
    // Uses a test-specific schema with Date type
    const DateTime = {
      name: "Date",
      properties: { name: "string", dateCompleted: "date" },
    };

    let realm;
    const path = "date.realm";

    // Add, then delete Date objects for this test
    beforeEach(async () => {
      realm = await Realm.open({
        schema: [DateTime],
        path,
      });

      realm.write(() => {
        realm.create("Date", {
          name: "now",
          dateCompleted: new Date(),
        });
        realm.create("Date", {
          name: "past",
          dateCompleted: new Date("December 17, 1985 03:24:00"),
        });
        realm.create("Date", {
          name: "withinYear",
          dateCompleted: new Date("February 17, 2021 03:24:00"),
        });
      });
    });

    afterEach(() => {
      realm.close();
      Realm.deleteFile({ path });
    });

    test("Date queries", () => {
      const dates = realm.objects("Date");
      // :snippet-start: date-alt-representation
      var today = new Date("April 01, 2021 03:24:00");

      var thisYear = new Date("2021-01-01@17:30:15:0");
      // :snippet-end:
      const dateParameterizedQuery = dates.filtered(
        // :snippet-start: date-parameterized-query
        // Find to-do items completed before today's date.
        "dateCompleted < $0",
        today

        // :remove-start:
      );

      const dateAlt1 = dates.filtered(
        // :remove-end:
        // Find to-do items completed this year up to today.
        "dateCompleted > $0 AND dateCompleted < $1",
        thisYear,
        today
        // :snippet-end:
      );

      expect(dateParameterizedQuery.length).toBe(2);
      expect(dateAlt1.length).toBe(1);
    });
  });

  test("Full-text search (FTS) query", () => {
    const items = realm.objects(Item);

    const itemsWithWrite = items.filtered(
      // :snippet-start: rql-fts
      // Filter for items with 'write' in the name
      "name TEXT $0",
      "write"

      // :remove-start:
    );

    const itemsWithWriteNotTest = items.filtered(
      // :remove-end:
      // Find items with 'write' but not 'tests' using '-'
      "name TEXT $0",
      "write -tests"

      // :remove-start:
    );

    const itemsStartingWithWri = items.filtered(
      // :remove-end:
      // Find items starting with 'wri-' using '*'
      "name TEXT $0",
      "wri*"
      // :snippet-end:
    );

    expect(itemsWithWrite.length).toBe(2);
    expect(itemsWithWriteNotTest.length).toBe(0);
    expect(itemsStartingWithWri.length).toBe(2);
  });
});
