import Realm from "realm";

const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    name: "string",
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
});
