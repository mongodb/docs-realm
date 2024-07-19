import Realm, { BSON } from "realm";
import { Address, Item, Office, Project } from "./models/rql-data-models.ts";
import { describe, expect } from "@jest/globals";

describe("Realm Query Language Reference", () => {
  let realm: Realm;
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
        street: "999 Big Boulevard",
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
      realm.create("Item", {
        // Unassigned incomplete item not in any project
        _id: new BSON.ObjectId("631a073c833a34ade21db2b2"),
        name: "Write tests",
        isComplete: false,
        assignee: null,
        priority: 10,
        progressMinutes: 0,
      });

      realm.create("Project", {
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
        // Mixed property is of type dictionary of mixed values
        // (date, list of strings, bool, and int)
        additionalInfo: {
          startDate: new Date("2021-01-01"),
          customerContacts: ["Alice", "Bob"],
          recurringCustomer: true,
          budget: 10000,
        },
      });
      const project = realm.create("Project", {
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
        // Mixed property is of type string
        additionalInfo: "Customer is a VIP.",
      });

      realm.create("Project", {
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
        // Mixed property is of type list, containing string and nested
        // dictionary of mixed values (date, boolean, and int)
        additionalInfo: [
        "Customer is difficult to work with.",
          {
          startDate: new Date("2021-03-01"),
          recurringCustomer: false,
          budget: 10000,
          },
        ],
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
    // Get all items where 'priority' property is 7 or more
    const importantItems = items.filtered("priority >= $0", 7);
    // :snippet-end:
    expect(importantItems.length).toEqual(5);
  });

  describe("Basic syntax", () => {
    test("Expression query", () => {
      const items = realm.objects(Item);
      // prettier-ignore
      const expression =
        // :snippet-start: predicate
        "priority == 1"
        ; // :remove:
      // Property Name: priority
      // Operator: ==
      // Value: 1
      // :snippet-end:
      expect(items.filtered(expression).length).toBe(1);
    });
    test("Serialized query", () => {
      const items = realm.objects(Item);
      const query = items.filtered(
        // :snippet-start: serialized-query
        "progressMinutes > 1 AND assignee == 'Ali'"
        // :snippet-end:
      );
      expect(query.length).toBe(1);
    });
    test("Parameterized query", () => {
      const items = realm.objects(Item);
      // prettier-ignore
      const substitution = items.filtered(
        // :snippet-start: parameterized-query
        // Include one parameter with `$0`
        "progressMinutes > 1 AND assignee == $0", "Ali"

        // :remove-start:
      );
      expect(substitution.length).toBe(1);
    });

    test("Multiple parameterized query", () => {
      const items = realm.objects(Item);
      // prettier-ignore
      const substitution = items.filtered(
        // :remove-end:
        // Include multiple parameters using ascending integers,
        // starting at`$0`
        "progressMinutes > $0 AND assignee == $1", 1, "Alex"
        // :snippet-end:
      );
      expect(substitution.length).toBe(1);
    });

    test("Dot notation", () => {
      const address = realm.objects(Project);
      const nestedItem = address.filtered(
        // :snippet-start: dot-notation
        // Find projects whose `items` list property contains an item
        // with a specific name
        "items[0].name == 'Approve project plan'"
        // :snippet-end:
      );
      const nestedZipcode = address.filtered(
        // :snippet-start: deep-dot-notation
        // Find projects whose `projectLocation` property contains an
        // embedded Address object with a specific zip code
        "projectLocation.address.zipcode == 10019"
        // :snippet-end:
      );
      expect(nestedItem.length).toBe(2);
      expect(nestedZipcode.length).toBe(3);
    });
  });

  // prettier-ignore
  test("Comparison operators", () => {
    const items = realm.objects(Item);

    const highPriorityItems = items.filtered(
      // :snippet-start: comparison-operators
      // Compare `priority` values against a threshold value
      "priority > $0", 5

      // :remove-start:
    );
    expect(highPriorityItems.length).toBe(5);

    const unassignedItems = items.filtered(
      // :remove-end:
      // Compare `assignee` values to `null` value.
      "assignee == $0", null

      // :remove-start:
    );
    expect(unassignedItems.length).toBe(1);

    const progressMinutesRange = items.filtered(
      // :remove-end:
      // Compare `priority` values against an inclusive range of values
      "priority BETWEEN { $0 , $1 }", 1, 5

      // :remove-start:
    );
    expect(progressMinutesRange.length).toBe(2);

    const progressMinutesIn = items.filtered(
    // :remove-end:
      // Compare `progressMinutes` values against any of the listed values
      "progressMinutes IN { $0, $1, $2 }", 10, 30, 60
      // :snippet-end:
    );
  });

  // prettier-ignore
  test("Logical operators", () => {
    const items = realm.objects(Item);
    const aliComplete = items.filtered(
      // :snippet-start: logical-operators
      // Find all items assigned to Ali AND marked completed
      "assignee == $0 AND isComplete == $1", "Ali", true

      // :remove-start:
    );
    const alexOrAli = items.filtered(
      // :remove-end:
      // Find all items assigned to Alex OR to Ali
      "assignee == $0 OR assignee == $1", "Alex", "Ali"
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
        // Evaluate against an item's `priority` property value:
        "2 * priority > 6" // (resolves to `priority > 3`)

        // :remove-start:
      );
      const lessBasicMath = items.filtered(
        // :remove-end:
        "priority >= 2 * (2 - 1) + 2" // (resolves to `priority >= 4`)

        // :remove-start:
      );
      expect(basicMath.length).toBe(6);
      expect(lessBasicMath.length).toBe(6);
    });

    test("Arithmetic with object properties", () => {
      const items = realm.objects(Item);
      const mathWithObjProps = items.filtered(
        // :remove-end:
        // Evaluate against multiple object property values:
        "progressMinutes * priority == 90"
        // :snippet-end:
      );
      expect(mathWithObjProps.length).toBe(2);
    });
  });

  // prettier-ignore
  describe("Type-specific operators", () => {
    test("String operators", () => {
      const projects = realm.objects(Project);
      const startWithE = projects.filtered(
        // :snippet-start: string-operators
        // Find projects whose name starts with 'E' or 'e'
        // (case-insensitive query)
        "name BEGINSWITH[c] $0", "E"

        // :remove-start:
      );
      expect(startWithE.length).toBe(1);

      const containIe = projects.filtered(
        // :remove-end:
        // Find projects whose name contains 'ie'
        // (case-sensitive query)
        "name CONTAINS $0", "ie"

        // :remove-start:
      );
      expect(containIe.length).toBe(0);
    });

    test("String comparisons", () => {
      const projects = realm.objects(Project);
      const items = realm.objects(Item);
      // prettier-ignore
      const assigneeBetween = items.filtered(
        // :remove-end:
        // Find items where the assignee name is lexicographically between
        // 'Ali' and 'Chris'(case-sensitive)
        "assignee BETWEEN { $0 , $1 }", "Ali", "Chris"

        // :remove-start:
      );
      // prettier-ignore
      const compareStreet = projects.filtered(
        // :remove-end:
        // Find projects where the street address is lexicographically
        // greater than '123 Main St'(case-sensitive)
        "projectLocation.address.street > $0", "123 Main St"
      //  :snippet-end:
      );
      expect(compareStreet.length).toBe(2);
      expect(assigneeBetween.length).toBe(2);
    });
  });

  // prettier-ignore
  test("Aggregate queries", () => {
    const projects = realm.objects(Project);
    // :snippet-start: aggregate-operators
    var priorityNum = 5;

    // :remove-start:
    const averageItemPriorityAbove5 = projects.filtered(
      // :remove-end:
      // Find projects with average item `priority` above 5
      "items.@avg.priority > $0", priorityNum

      // :remove-start:
    );
    expect(averageItemPriorityAbove5.length).toBe(3);

    const allItemsLowerPriority = projects.filtered(
      // :remove-end:
      // Find projects where every item has a `priority` less than 5
      "items.@max.priority < $0", priorityNum

      // :remove-start:
    );
    expect(allItemsLowerPriority.length).toBe(0);

    const allItemsHighPriority = projects.filtered(
      // :remove-end:
      // Find projects where every item has `priority` greater than 5
      "items.@min.priority > $0", priorityNum

      // :remove-start:
    );
    expect(allItemsHighPriority.length).toBe(0);

    const moreThan5Items = projects.filtered(
      // :remove-end:
      // Find projects with more than 5 items
      "items.@count > $0", 5

      // :remove-start:
    );
    expect(moreThan5Items.length).toBe(0);

    const longRunningProjects = projects.filtered(
      // :remove-end:
      // Find projects where the sum total value of `progressMinutes`
      // across all items is greater than 100
      "items.@sum.progressMinutes > $0",
      100
      // :snippet-end:
    );
    expect(longRunningProjects.length).toBe(1);
  });

  describe("Collection operators", () => {
    test("Collection queries", () => {
      const projects = realm.objects(Project);
      // prettier-ignore
      const noCompleteItems = projects.filtered(
        // :snippet-start: set-operators
        // Find projects with no complete items
        "NONE items.isComplete == $0", true

        // :remove-start:
      );
      // prettier-ignore
      const anyTopPriorityItems = projects.filtered(
        // :remove-end:
        // Find projects that contain any item with priority 10
        "items.priority == $0", 10 // (ANY operator is implied)

        // :remove-start:
      );
      // prettier-ignore
      const allItemsCompleted = projects.filtered(
        // :remove-end:
        // Find projects that only contain completed items
        "ALL items.isComplete == $0", true

        // :remove-start:
      );
      // prettier-ignore
      const assignedToAlexOrAli = projects.filtered(
        // :remove-end:
        // Find projects with at least one item assigned to
        // either Alex or Ali
        "ANY items.assignee IN { $0 , $1 }", "Alex", "Ali"

        // :remove-start:
      );
      // prettier-ignore
      const notAssignedToAlexOrAli = projects.filtered(
        // :remove-end:
        // Find projects with no items assigned to either Alex or Ali
        "NONE items.assignee IN { $0 , $1 }", "Alex", "Ali"
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
        // Find an item with the specified ObjectId value
        // in the`items` collection
        "oid(631a072f75120729dc9223d9) IN items._id"
        // :snippet-end:
      );
      const staticQuery = items.filtered(
        // :snippet-start: list-comparisons-static
        // Find items with a priority value matching any value
        // in the static list
        "priority IN {0, 1, 2}"
        // :snippet-end:
      );
      // :snippet-start: list-comparisons-parameterized
      const ids = [
        new BSON.ObjectId("631a072f75120729dc9223d9"),
        new BSON.ObjectId("631a0737c98f89f5b81cd24d"),
        new BSON.ObjectId("631a073c833a34ade21db2b2"),
      ];
      // Find items with an ObjectId value matching any value
      // in the parameterized list
      const parameterizedQuery = realm.objects(Item).filtered("_id IN $0", ids);
      // :snippet-end:

      // prettier-ignore
      const anyOperator = items.filtered(
        // :snippet-start: equivalent-lists-any-operator
        "assignee == ANY { $0, $1 }", "Alex", "Ali"

        // :remove-start:
      );
      // prettier-ignore
      const equivalentAnyOperator = items.filtered(
        // :remove-end:
        "assignee == { $0, $1 }", "Alex", "Ali" // Equivalent (ANY is implied)
        // :snippet-end:
      );

      expect(anyOperator.length).toBe(2);
      expect(equivalentAnyOperator.length).toBe(2);
      expect(collectionQuery.length).toBe(1);
      expect(staticQuery.length).toBe(1);
      expect(parameterizedQuery.length).toBe(3);
    });

    test("Sort, distinct, and limit results", () => {
      const items = realm.objects(Item);

      const sortedItems = items.filtered(
        // :snippet-start: sort-distinct-limit
        // Find incomplete items, sort by `priority` in descending order,
        // then sort equal `priority` values by `progressMinutes`
        // in ascending order
        "isComplete == false SORT(priority DESC, progressMinutes ASC)"

        // :remove-start:
      );
      expect(sortedItems[0].name).toBe("Demo template app");
      const distinctItems = items.filtered(
        // :remove-end:
        // Find high priority items, then remove from the results any items
        // with duplicate values for both `name` AND `assignee` properties
        "priority >= 5 DISTINCT(name, assignee)"

        // :remove-start:
      );
      expect(distinctItems.length).toBe(6);
      const limitItems = items.filtered(
        // :remove-end:
        // Find in-progress items, then return the first 10 results
        "progressMinutes > 0 && isComplete != true LIMIT(10)"
        // :snippet-end:
      );
      expect(limitItems[0].name).toBe("Write tests");

      const sortFirst = items.filtered(
        // :snippet-start: sort-distinct-limit-order-matters
        // 1. Sorts by highest priority
        // 2. Returns the first item
        // 3. Remove duplicate names (N/A - a single item is always distinct)
        "assignee == null SORT(priority ASC) LIMIT(1) DISTINCT(name)"

        // :remove-start:
      );
      const limitLast = items.filtered(
        // :remove-end:
        // 1. Removes any duplicates by name
        // 2. Sorts by highest priority
        // 3. Returns the first item
        "assignee == null DISTINCT(name) SORT(priority ASC) LIMIT(1)"
        // :snippet-end:
      );
    });

      test("Subquery query", () => {
        const projects = realm.objects("Project");
        const subquery = projects.filtered(
          // :snippet-start: subquery
          // Find projects with incomplete items with 'Demo' in the name
          "SUBQUERY(items, $item, $item.isComplete == false AND $item.name CONTAINS[c] 'Demo').@count > 0"

          // :remove-start:
        );
        expect(subquery.length).toBe(1);
        expect(subquery[0].name).toBe("Project that Meets Quota");

        const subquery2 = projects.filtered(
          // :remove-end:
          // Find projects where the number of completed items is
          // greater than or equal to the project's `quota` property
          "SUBQUERY(items, $item, $item.isComplete == true).@count >= quota"
          // :snippet-end:
        );

        expect(subquery2.length).toBe(1);
        expect(subquery2[0].name).toBe("Project that Meets Quota");
       });

    // prettier-ignore
    test("Dictionary operators", () => {
      const dictionaries = realm.objects(Project);
      const statusKey = dictionaries.filtered(
        // :snippet-start: dictionary-operators
        // Find projects whose `comments` dictionary property
        // have a key of 'status'
        "comments.@keys == $0", "status"

        // :remove-start:
      );
      const statusOnTrack = dictionaries.filtered(
        // :remove-end:
        // Find projects whose `comments` dictionary property
        // have a 'status' key with a value that ends in 'track'
        "comments['status'] LIKE $0", "*track"

        // :remove-start:
      );
      const numItemsInDict = dictionaries.filtered(
        // :remove-end:
        // Find projects whose `comments` dictionary property
        // have more than one key-value pair
        "comments.@count > $0", 1

        // :remove-start:
      );

      const allString = dictionaries.filtered(
        // :remove-end:
        // Find projects whose `comments` dictionary property contains
        // only values of type 'string'
        "ALL comments.@type == 'string'"

        // :remove-start:
      );

      const noInts = dictionaries.filtered(
        // :remove-end:
        // Find projects whose `comments` dictionary property contains
        // no values of type 'int'
        "NONE comments.@type == 'int'"
        // :snippet-end:
      );
      expect(statusKey.length).toBe(3);
      expect(statusOnTrack.length).toBe(1);
      expect(numItemsInDict.length).toBe(3);
      expect(allString.length).toBe(3);
      expect(noInts.length).toBe(3);
    });
  });

  describe("Backlinks queries", () => {
    test("Backlinks query @links", () => {
      const atLinksResult = realm.objects(Item).filtered(
        // :snippet-start: backlinks-atLinks
        // Find items that belong to a project with a quota less than 10
        // (using '@links.<ObjectType>.<PropertyName>')
        "@links.Project.items.quota < 10"
        // :snippet-end:
      );
      expect(atLinksResult.length).toBe(5);

      const linkingObjectsResult = realm.objects(Item).filtered(
        // :snippet-start: backlinks-linkingObjects
        // Find items that belong to a project with a quota greater than 10
        // through the Item object's `projects` property
        // (using 'LinkingObjects')
        "projects.quota > 10"
        // :snippet-end:
      );
      expect(linkingObjectsResult.length).toBe(2);
    });

    test("Backlinks collection operators", () => {
      const anyResult = realm.objects(Item).filtered(
        // :snippet-start: backlinks-collection-operators
        // Find items where no project that references the item has a
        // quota greater than 10
        "NONE @links.Project.items.quota > 10"

        // :remove-start:
      );
      expect(anyResult.length).toBe(5);

      const allResult = realm.objects(Item).filtered(
        // :remove-end:
        // Find items where all projects that reference the item have a
        // quota less than 5
        "ALL @links.Project.items.quota < 5"

        // :remove-start:
      );
      expect(allResult.length).toBe(5);
    });

    test("Backlinks aggregate operators", () => {
      const shallowResultLinkingObjects = realm.objects(Item).filtered(
        // :remove-end:
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
        // Find items that belong to a project where the average item
        // has been worked on for at least 10 minutes
        "@links.Project.items.items.@avg.progressMinutes > 10"

        // :remove-start:
      );
      expect(deepResultAtLinks.length).toBe(2);
      expect(deepResultAtLinks[0].name).toBe("Write tests");
    });

    test("Count all backlinks (@links.@count)", () => {
      const result = realm.objects(Item).filtered(
        // :remove-end:
        // Find items that are not referenced by another object
        // of any type (backlink count is 0)
        "@links.@count == 0"
        // :snippet-end:
      );
      expect(result.length).toBe(1);
      expect(result[0].name).toBe("Write tests");
    });
  });

  describe("Type operators", () => {
    test("Type operator", () => {
      const projects = realm.objects(Project);
      const mixedString = projects.filtered(
        // :snippet-start: type-operator
        // Find projects with an `additionalInfo` property of string type
        "additionalInfo.@type == 'string'"

        // :remove-start:
      );
      const mixedCollection = projects.filtered(
        // :remove-end:
        // Find projects with an `additionalInfo` property of
        // `collection` type, which matches list or dictionary types
        "additionalInfo.@type == 'collection'"

        // :remove-start:
      );
      const mixedBool = projects.filtered(
        // :remove-end:
        // Find projects with an `additionalInfo` property of list type,
        // where any list element is of type 'bool'
        "additionalInfo[*].@type == 'bool'"
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
      // :remove-start:
    );
    // prettier-ignore
    const res2 = realm.objects(Item).filtered(
      // :remove-end:
      "assignee == $0", null // 'null' maps to SDK language's null pointer
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

    let realm: Realm;
    const path = "oidUuid.realm";

    const oidValueString = "6001c033600510df3bbfd864";
    const uuid1String = "d1b186e1-e9e0-4768-a1a7-c492519d47ee";
    const oidValue = new BSON.ObjectId(oidValueString);
    const uuidValue = new BSON.UUID(uuid1String);

    // Add, then delete objects for this test
    beforeEach(async () => {
      realm = await Realm.open({ schema: [OidUuid], path });
      const obj1 = {
        _id: oidValue,
        id: uuidValue,
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

    test("ObjectId query", () => {
      const oidUuids = realm.objects("OidUuid");
      // prettier-ignore
      const oidStringLiteral = oidUuids.filtered(
        // :snippet-start: oid
        // Find an item whose `_id` matches the ObjectID value
        // passed to 'oid()'
        "_id == oid(6001c033600510df3bbfd864)"

        // :remove-start:
      );

      const oidInterpolation = oidUuids.filtered(
        // :remove-end:
        // Find an item whose `_id` matches the ObjectID passed as
        // a parameterized query argument
        "_id == $0", oidValue

        // :remove-start:
      );

      expect(oidStringLiteral.length).toBe(1);
      expect(oidInterpolation.length).toBe(1);
    });
    test("UUID query", () => {
      const oidUuids = realm.objects("OidUuid");
      const uuid = oidUuids.filtered(
        // :remove-end:
        // Find an item whose `id` matches the UUID value
        // passed to 'uuid()'
        "id == uuid(d1b186e1-e9e0-4768-a1a7-c492519d47ee)"

        // :remove-start:
      );
      // prettier-ignore
      const test = oidUuids.filtered(
        // :remove-end:
        // Find an item whose `_id` matches the UUID passed as
        // a parameterized query argument
        "id == $0", uuidValue
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

    let realm: Realm;
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

    // prettier-ignore
    test("Date queries", () => {
      const dates = realm.objects("Date");
      // :snippet-start: date-alt-representation
      var lastYear = new Date(1577883184000); // Unix timestamp in ms
      var thisYear = new Date("2021-01-01@17:30:15:0"); // DateTime in UTC
      var today = new Date("April 01, 2021 03:24:00"); // Alternate DateTime format
      // :snippet-end:
      const dateParameterizedQuery = dates.filtered(
        // :snippet-start: date-parameterized-query
        // Find to-do items completed before today's date
        "dateCompleted < $0", today

        // :remove-start:
      );

      const dateAlt1 = dates.filtered(
        // :remove-end:
        // Find to-do items completed between start of the year to today
        "dateCompleted > $0 AND dateCompleted < $1", thisYear, today
        // :snippet-end:
      );

      expect(dateParameterizedQuery.length).toBe(2);
      expect(dateAlt1.length).toBe(1);
    });
  });

  // prettier-ignore
  test("Full-text search (FTS) query", () => {
    const items = realm.objects(Item);

    const itemsWithWrite = items.filtered(
      // :snippet-start: rql-fts
      // Find items with 'write' in the name.
      "name TEXT $0", "write"

      // :remove-start:
    );

    const itemsWithWriteNotTest = items.filtered(
      // :remove-end:
      // Use '-' to exclude:
      // Find items with 'write' but not 'tests' in the name
      "name TEXT $0", "write -tests"

      // :remove-start:
    );

    const itemsStartingWithWri = items.filtered(
      // :remove-end:
      // Use '*' to match any characters after a prefix:
      // Find items with a name that starts with 'wri'
      "name TEXT $0", "wri*"
      // :snippet-end:
    );
    expect(itemsWithWrite.length).toBe(2);
    expect(itemsWithWriteNotTest.length).toBe(0);
    expect(itemsStartingWithWri.length).toBe(2);
  });
});
