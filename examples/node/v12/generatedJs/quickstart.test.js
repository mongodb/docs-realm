"use strict";
var _realm = _interopRequireWildcard(require("realm"));
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== "function") return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function (nodeInterop) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
} // :snippet-start: import-realm
// :snippet-end:

_realm.flags.ALLOW_CLEAR_TEST_STATE = true;

describe("QuickStart Local", () => {
  test("should define an object model, open a realm, perform crud operations, and watch a collection", async () => {
    // :snippet-start: open-a-realm
    // :snippet-start: define-an-object-model
    class Task extends _realm.default.Object {
      static schema = {
        name: "Task",
        properties: {
          _id: "int",
          name: "string",
          status: "string?",
          owner_id: "string?",
        },
        primaryKey: "_id",
      };
    }
    // :snippet-end:

    const realm = await _realm.default.open({
      schema: [Task],
    });
    // :snippet-end:

    expect(realm.isClosed).toBe(false);

    // Add default test object to realm.
    realm.write(() => {
      realm.create(Task, {
        _id: 0,
        name: "wake up",
        status: "Open",
      });
    });

    // :snippet-start: find-sort-and-filter-objects
    // Query for specific obect using primary key.
    const specificTask = realm.objectForPrimaryKey(Task, 0);

    // Query realm for all instances of the "Task" type.
    const tasks = realm.objects(Task);

    // Filter for all tasks with a status of "Open".
    const openTasks = tasks.filtered("status = 'Open'");

    // Sort tasks by name in ascending order.
    const tasksByName = tasks.sorted("name");
    // :snippet-end:

    expect(specificTask).toBeTruthy();
    expect(tasks.length).toBe(1);
    expect(openTasks.length).toBe(1);
    expect(tasksByName[0].name).toBe("wake up");

    // :snippet-start: watch-a-collection
    // Define the collection notification listener.
    const listener = (tasks, changes) => {
      // :remove-start:
      if (changes.newModifications.length > 0) {
        taskHasBeenModified = true;
      }
      if (changes.deletions.length > 0) {
        taskHasBeenDeleted = true;
      }
      // :remove-end:
      // Update UI in response to deleted objects.
      changes.deletions.forEach((index) => {
        // Deleted objects cannot be accessed directly,
        // but we can update a UI list, etc. knowing the index.
        console.log(`A task was deleted at the ${index} index.`);
        // ...
      });

      // Update UI in response to inserted objects.
      changes.insertions.forEach((index) => {
        const insertedTasks = tasks[index];
        console.log(`insertedTasks: ${JSON.stringify(insertedTasks, null, 2)}`);
        // ...
      });

      // Update UI in response to modified objects.
      // `newModifications` contains an index to the modified object's position
      // in the collection after all deletions and insertions have been applied.
      changes.newModifications.forEach((index) => {
        const modifiedTask = tasks[index];
        console.log(`modifiedTask: ${JSON.stringify(modifiedTask, null, 2)}`);
        // ...
      });
    };

    // Observe collection notifications.
    //@ts-expect-error TYPEBUG: OrderedCollection is incorrectly implemented
    tasks.addListener(listener);
    // :snippet-end:

    // :snippet-start: create-modify-delete
    const allTasks = realm.objects(Task);

    // Add a couple of Tasks in a single, atomic transaction.
    realm.write(() => {
      realm.create(Task, {
        _id: 1,
        name: "go grocery shopping",
        status: "Open",
      });

      realm.create(Task, {
        _id: 2,
        name: "go exercise",
        status: "Open",
      });
    });
    // :remove-start:
    expect(tasks.length).toBe(3);
    expect(openTasks.length).toBe(3);
    expect(tasksByName[0].name).toBe("go exercise");
    expect(tasksByName[1].name).toBe("go grocery shopping");
    expect(tasksByName[2].name).toBe("wake up");

    let taskHasBeenModified = false;
    let taskHasBeenDeleted = false;
    // :remove-end:

    const task1 = allTasks.find((task) => task._id == 1);
    expect(task1).toBeTruthy(); // :remove:
    const task2 = allTasks.find((task) => task._id == 2);
    expect(task2).toBeTruthy(); // :remove:

    realm.write(() => {
      // Modify an object.
      task1.status = "InProgress";

      // Delete an object.
      realm.delete(task2);
    });
    // :snippet-end:

    expect(task1.status).toBe("InProgress");

    // Wait 1 second until the collection listener has registered the
    // modification and deletion events.
    setTimeout(() => {
      expect(taskHasBeenModified).toBe(true);
      expect(taskHasBeenDeleted).toBe(true);
    }, 1000);

    // Clear all objects from realm.
    realm.write(() => {
      realm.deleteAll();
    });

    // :snippet-start: close-a-realm
    // Close the realm.
    realm.close();
    // :snippet-end:

    expect.hasAssertions();
  });
});

describe("Quickstart Sync", () => {
  test("should open a Flexible Sync realm with initial subscriptions", async () => {
    // :snippet-start: open-realm-with-subscriptions
    // :snippet-start: anonymous-login
    // :snippet-start: initialize
    // :replace-start: {
    //   "terms": {
    //     "js-flexible-oseso": "<yourAppId>"
    //   }
    // }
    // Initialize your App.
    const app = new _realm.default.App({
      id: "js-flexible-oseso",
    });
    // :replace-end:
    // :snippet-end:
    expect(app).toBeTruthy(); // :remove:
    expect(app.id).toBe("js-flexible-oseso"); // :remove:

    // Authenticate an anonymous user.
    const anonymousUser = await app.logIn(
      _realm.default.Credentials.anonymous()
    );
    // :snippet-end:
    expect(app.currentUser).toBeTruthy(); // :remove:

    // Define an object model
    class Task extends _realm.default.Object {
      static schema = {
        name: "Task",
        properties: {
          _id: "int",
          name: "string",
          status: "string?",
          progressMinutes: "int?",
          owner_id: "string?",
          dueDate: "date?",
        },
        primaryKey: "_id",
      };
    }

    // Create a `SyncConfiguration` object.
    const config = {
      schema: [Task],
      sync: {
        // Use the previously-authenticated anonymous user.
        user: anonymousUser,
        // Set flexible sync to true to enable sync.
        flexible: true,
        // Define initial subscriptions to start syncing data as soon as the
        // realm is opened.
        initialSubscriptions: {
          update: (subs, realm) => {
            subs.add(
              // Get objects that match your object model, then filter them by
              // the `owner_id` queryable field
              realm.objects(Task).filtered(`owner_id == "${anonymousUser.id}"`)
            );
          },
        },
      },
    };

    const realm = await _realm.default.open(config);
    // :snippet-end:

    expect(realm.isClosed).toBe(false);

    const assignedTasks = realm
      .objects(Task)
      .filtered(`owner_id == "${anonymousUser.id}"`);

    expect(assignedTasks.length).toBe(0);
  }, 30000);

  expect.hasAssertions();
});
