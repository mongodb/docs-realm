import Realm from "realm";

const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
    priority: "int?",
    progressMinutes: "int?",
  },
  primaryKey: "_id",
};

describe("Read & Write Data", () => {
  test("should find a specific object by primary key", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "myrealm",
      schema: [TaskSchema],
    });

    let task;

    // write to a realm
    realm.write(() => {
      task = realm.create("Task", {
        _id: 12342245,
        name: "Do the dishes",
      });
    });

    // :code-block-start: read-and-write-data-object-for-primary-key
    const myTask = realm.objectForPrimaryKey("Task", 12342245); // search for a realm object with a primary key that is an int.
    // :code-block-end:

    expect(myTask.name).toBe(task.name);

    realm.write(() => {
      // after running test delete the task
      realm.delete(task);
    });
    task = null;

    // close the realm
    realm.close();
  });
  test("should query an object type", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "myrealm",
      schema: [TaskSchema],
    });

    let task;

    // write to a realm
    realm.write(() => {
      task = realm.create("Task", {
        _id: 321512,
        name: "Walk the dog",
      });
    });

    // :code-block-start: read-and-write-data-query-an-object-type
    // Query realm for all instances of the "Task" type.
    const tasks = realm.objects("Task");
    // :code-block-end:

    expect(tasks[0].name).toBe(task.name);

    realm.write(() => {
      // after running test delete the task
      realm.delete(task);
    });
    task = null;

    // close the realm
    realm.close();
  });
  test("should return objects from filter queries", async () => {
    // a realm is opened
    const realm = await Realm.open({
      path: "myrealm",
      schema: [TaskSchema],
    });
    let task, task2, task3;
    // write to a realm
    realm.write(() => {
      task = realm.create("Task", {
        _id: 191230,
        name: "go grocery shopping",
        priority: 10,
        progressMinutes: 50,
      });
      task2 = realm.create("Task", {
        _id: 325212012,
        name: "throw out the trash",
        priority: 4,
        progressMinutes: 0,
      });
      task3 = realm.create("Task", {
        _id: 43259540,
        name: "do the laundry",
        priority: 2,
        progressMinutes: 5,
      });
    });

    // :code-block-start: read-and-write-filter-queries
    // retrieve the set of Task objects
    const tasks = realm.objects("Task");
    // filter for tasks with a high priority
    const highPriorityTasks = tasks.filtered("priority > 5");
    // filter for tasks that have just-started or short-running progress
    const lowProgressTasks = tasks.filtered(
      "1 <= progressMinutes && progressMinutes < 10"
    );
    console.log(
      `Number of high priority tasks: ${highPriorityTasks.length} \n`,
      `Number of just-started or short-running tasks: ${lowProgressTasks.length}`
    );
    // :code-block-end:

    expect(highPriorityTasks[0].name).toBe(task.name); // expect that 'go grocery shopping' should be the first (and only) high priority
    expect(lowProgressTasks[0].name).toBe(task3.name); // expect that 'do the laundry' should be the first (and only) low progress task
    // delete tasks
    realm.write(() => {
      realm.delete(task);
      realm.delete(task2);
      realm.delete(task3);
    });
  });
});
