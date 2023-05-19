"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// :snippet-start: import-realm
const realm_1 = __importStar(require("realm"));
// :snippet-end:
realm_1.flags.ALLOW_CLEAR_TEST_STATE = true;
describe("QuickStart Local", () => {
    beforeEach(() => {
        // Close and remove all realms in the default directory.
        realm_1.default.clearTestState();
    });
    test("should define an object model, open a realm, perform crud operations, and watch a collection", async () => {
        // :snippet-start: open-a-realm
        // :snippet-start: define-an-object-model
        class Task extends realm_1.default.Object {
            _id;
            name;
            status;
            owner_id;
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
        const realm = await realm_1.default.open({
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
        const listener = (
        //@ts-expect-error TYPEBUG: OrderedCollection is incorrectly implemented
        tasks, changes) => {
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
    beforeEach(() => {
        // Close and remove all realms in the default directory.
        realm_1.default.clearTestState();
    });
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
        const app = new realm_1.default.App({
            id: "js-flexible-oseso",
        });
        // :replace-end:
        // :snippet-end:
        expect(app).toBeTruthy(); // :remove:
        expect(app.id).toBe("js-flexible-oseso"); // :remove:
        // Authenticate an anonymous user.
        const anonymousUser = await app.logIn(realm_1.default.Credentials.anonymous());
        // :snippet-end:
        expect(app.currentUser).toBeTruthy(); // :remove:
        // Define an object model
        class Task extends realm_1.default.Object {
            _id;
            name;
            status;
            progressMinutes;
            owner_id;
            dueDate;
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
                        realm.objects(Task).filtered(`owner_id == "${anonymousUser.id}"`));
                    },
                },
            },
        };
        const realm = await realm_1.default.open(config);
        // :snippet-end:
        expect(realm.isClosed).toBe(false);
        const assignedTasks = realm
            .objects(Task)
            .filtered(`owner_id == "${anonymousUser.id}"`);
        expect(assignedTasks.length).toBe(0);
    }, 30000);
    expect.hasAssertions();
});
