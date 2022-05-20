// :snippet-start: import-realm
import Realm from "realm";
// :snippet-end:

describe("QuickStart Local", () => {
  test("should define an object model, open a realm, perform crud operations, and watch a collection", async () => {
    // :snippet-start: complete
    // :uncomment-start:
    //import Realm from "realm";
    // :uncomment-end:

    // :snippet-start: define-an-object-model
    const TaskSchema = {
      name: "Task",
      properties: {
        _id: "int",
        name: "string",
        status: "string?",
      },
      primaryKey: "_id",
    };
    // :snippet-end:

    async function quickStart() {
      // :snippet-start: open-a-realm
      const realm = await Realm.open({
        path: "realm-files/myrealm",
        schema: [TaskSchema],
      });
      // :snippet-end:

      // :snippet-start: create-realm-objects
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
      // :snippet-end:
      // :remove-start:
      expect(task1.name).toBe("go grocery shopping");
      expect(task2.name).toBe("go exercise");
      // :remove-end:

      // :snippet-start: find-sort-and-filter-objects
      // query realm for all instances of the "Task" type.
      const tasks = realm.objects("Task");
      console.log(`The lists of tasks are: ${tasks.map((task) => task.name)}`);

      // filter for all tasks with a status of "Open"
      const openTasks = tasks.filtered("status = 'Open'");
      console.log(
        `The lists of open tasks are: ${openTasks.map(
          (openTask) => openTask.name
        )}`
      );

      // Sort tasks by name in ascending order
      const tasksByName = tasks.sorted("name");
      console.log(
        `The lists of tasks in alphabetical order are: ${tasksByName.map(
          (taskByName) => taskByName.name
        )}`
      );
      // :snippet-end:

      // :remove-start:
      expect(tasks.length).toBe(2);
      expect(openTasks.length).toBe(2);
      expect(tasksByName[0].name).toBe("go exercise");

      let taskHasBeenModified = false;
      let taskHasBeenDeleted = false;
      // :remove-end:

      // :snippet-start: watch-a-collection
      // Define the collection notification listener
      function listener(tasks, changes) {
        // :remove-start:
        if (changes.newModifications.length > 0) {
          taskHasBeenModified = true;
        }
        if (changes.deletions.length > 0) {
          taskHasBeenDeleted = true;
        }
        // :remove-end:
        // Update UI in response to deleted objects
        changes.deletions.forEach((index) => {
          // Deleted objects cannot be accessed directly,
          // but we can update a UI list, etc. knowing the index.
          console.log(`A task was deleted at the ${index} index`);
        });
        // Update UI in response to inserted objects
        changes.insertions.forEach((index) => {
          let insertedTasks = tasks[index];
          console.log(
            `insertedTasks: ${JSON.stringify(insertedTasks, null, 2)}`
          );
          // ...
        });
        // Update UI in response to modified objects
        // `newModifications` contains object indexes from after they were modified
        changes.newModifications.forEach((index) => {
          let modifiedTask = tasks[index];
          console.log(`modifiedTask: ${JSON.stringify(modifiedTask, null, 2)}`);
          // ...
        });
      }
      // Observe collection notifications.
      tasks.addListener(listener);
      // :snippet-end:

      // :snippet-start: modify-an-object
      realm.write(() => {
        task1.status = "InProgress";
      });
      // :snippet-end:

      // :remove-start:
      expect(task1.status).toBe("InProgress");
      // :remove-end:

      // :snippet-start: delete-an-object
      realm.write(() => {
        // Delete the task from the realm.
        realm.delete(task1);
        // Discard the reference.
        task1 = null;
      });
      // :snippet-end:

      // :remove-start:
      // wait 1 second until the collection listener has registered the modification and deletion events
      setTimeout(() => {
        expect(taskHasBeenModified).toBe(true);
        expect(taskHasBeenDeleted).toBe(true);
      }, 1000);
      realm.write(() => {
        realm.delete(task2); // task1 has already been deleted
      });
      // :remove-end:

      // :snippet-start: close-a-realm
      // Remember to close the realm
      realm.close();
      // :snippet-end:
    }
    quickStart().catch((error) => {
      console.log(`An error occurred: ${error}`);
    });
    // :snippet-end:
  });
});
