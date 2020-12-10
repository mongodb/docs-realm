import * as Realm from "realm";
import { ObjectId } from "bson";

// Update this with your App ID
const app = new Realm.App({ id: "<Your App ID>" });

type Task = {
  _id: ObjectId;
  _partition?: string;
  name: string;
  status: string;
};
const TaskSchema = {
  name: "Task",
  properties: {
    _id: "objectId",
    _partition: "string?",
    name: "string",
    status: "string",
  },
  primaryKey: "_id",
};

async function run() {
  const credentials = Realm.Credentials.anonymous();
  await app.logIn(credentials);
  console.log(`Logged in anonymously with user id: ${app.currentUser?.id}`);

  const realm = await Realm.open({
    schema: [TaskSchema],
    sync: {
      user: app.currentUser as Realm.User,
      partitionValue: "quickstart",
    },
  });

  // Get all Tasks in the realm
  const tasks = realm.objects<Task>("Task");

  // Add a listener that fires whenever one or more Tasks are inserted, modified, or deleted.
  tasks.addListener(taskListener);

  // Add a couple of Tasks in a single, atomic transaction
  // Realm automatically sets the _partition property based on the partitionValue used to open the realm
  realm.write(() => {
    const task1 = realm.create<Task>("Task", {
      _id: new ObjectId(),
      name: "go grocery shopping",
      status: "Open",
    });

    const task2 = realm.create<Task>("Task", {
      _id: new ObjectId(),
      name: "go exercise",
      status: "Open",
    });
    console.log(`created two tasks: ${task1.name} & ${task2.name}`);
  });

  // Find a specific Task
  let task: Task = tasks.filtered("status = 'Open' LIMIT(1)")[0];
  console.log("task", JSON.stringify(task, null, 2));

  // Update the Task
  realm.write(() => {
    task.status = "InProgress";
  });

  // Delete the Task
  realm.write(() => {
    realm.delete(task);
  });

  // Clean up
  tasks.removeListener(taskListener);
  realm.close();
  app.currentUser?.logOut();
}
run().catch((err) => {
  console.error(err);
});

// Define the collection notification listener
const taskListener = (
  tasks: Realm.Collection<Task>,
  changes: Realm.ObjectChanges
) => {
  // Update UI in response to deleted objects
  (changes.deletions as unknown as number[]).forEach((index) => {
    // Deleted objects cannot be accessed directly,
    // but we can update a UI list, etc. knowing the index.
    console.log(`- deleted a task -`);
  });

  // Update UI in response to inserted objects
  (changes.insertions as unknown as number[]).forEach((index) => {
    let insertedTask = tasks[index].name;
    console.log(`inserted task: ${JSON.stringify(insertedTask, null, 2)}`);
    // ...
  });

  // Update UI in response to modified objects
  (changes.newModifications as unknown as number[]).forEach((index) => {
    let modifiedTask = tasks[index];
    console.log(`modified task: ${JSON.stringify(modifiedTask, null, 2)}`);
    // ...
  });
};
