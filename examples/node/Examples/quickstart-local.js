// :code-block-start: quickstart-local-import-realm
import Realm from "realm";
// :code-block-end:

// :code-block-start: quickstart-local-define-an-object-model
const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    status: "string?",
  },
  primaryKey: "_id",
};
// :code-block-end:

describe("QuickStart Local", () => {
  test("should define an object model, open a realm, perform crud operations, and watch a collection", async () => {
    // :code-block-start: quickstart-local-open-a-realm
    const realm = await Realm.open({
      path: "myrealm",
      schema: [TaskSchema],
    });
    // :code-block-end:
    // :code-block-start: quickstart-local-create-realm-objects
    // Add a couple of Tasks in a single, atomic transaction
    let task1, task2;
    realm.write(() => {
      task1 = realm.create("Task", {
        _id: 1,
        name: "go grocery shopping",
        status: "Open",
      });

      task2 = realm.create("Task", {
        _id: 2,
        name: "go exercise",
        status: "Open",
      });
      console.log(`created two tasks: ${task1.name} & ${task2.name}`);
    });
    // use task1 and task2
    // :code-block-end:
    expect(task1.name).toBe("go grocery shopping");
    expect(task2.name).toBe("go exercise");

    // :code-block-start: quickstart-local-find-sort-and-filter-objects
    // query realm for all instances of the "Task" type.
    const tasks = realm.objects("Task");

    // filter for all tasks with a status of "Open"
    const openTasks = tasks.filtered("status = 'Open'");

    // Sort tasks by name in ascending order
    const tasksByName = tasks.sorted("name");
    // :code-block-end:
    expect(tasks.length).toBe(2);
    expect(openTasks.length).toBe(2);
    expect(tasksByName[0].name).toBe("go exercise");

    let taskHasBeenModified = false;
    let taskHasBeenDeleted = false;
    // :code-block-start: quickstart-local-watch-a-collection
    // Define the collection notification listener
    function listener(tasks, changes) {
      // :hide-start:
      if (changes.newModifications.length > 0) {
        taskHasBeenModified = true;
      }
      if (changes.deletions.length > 0) {
        taskHasBeenDeleted = true;
      }
      // :hide-end:
      // Update UI in response to deleted objects
      changes.deletions.forEach((index) => {
        // Deleted objects cannot be accessed directly,
        // but we can update a UI list, etc. knowing the index.
      });
      // Update UI in response to inserted objects
      changes.insertions.forEach((index) => {
        let insertedTasks = tasks[index];
        // ...
      });
      // Update UI in response to modified objects
      // `oldModifications` contains object indexes from before they were modified
      changes.oldModifications.forEach((index) => {
        let modifiedTask = tasks[index];
        // ...
      });
      // Update UI in response to modified objects
      // `newModifications` contains object indexes from after they were modified
      changes.newModifications.forEach((index) => {
        let modifiedTask = tasks[index];
        // ...
      });
    }
    // Observe collection notifications.
    tasks.addListener(listener);
    // :code-block-end:

    // :code-block-start: quickstart-local-modify-an-object
    realm.write(() => {
      task1.status = "InProgress";
    });
    // :code-block-end:
    expect(task1.status).toBe("InProgress");
    // :code-block-start: quickstart-local-delete-an-object
    realm.write(() => {
      // Delete the task from the realm.
      realm.delete(task1);
      // Discard the reference.
      task1 = null;
    });
    // :code-block-end:

    // wait 1 second until the collection listener has registered the modification and deletion events
    setTimeout(() => {
      expect(taskHasBeenModified).toBe(true);
      expect(taskHasBeenDeleted).toBe(true);
    }, 1000);

    realm.write(() => {
      realm.delete(task2); // task1 has already been deleted
    });

    realm.close();
  });
});
