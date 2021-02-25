// :code-block-start: local-quickstart-import-realm
import Realm from "realm";
// :code-block-end:

// :code-block-start: local-quickstart-define-an-object-model
const TaskSchema = {
  name: "Task",
  properties: {
    _id: "int",
    _partition: "string?",
    name: "string",
    status: "string",
  },
  primaryKey: "_id",
};
// :code-block-end:

describe("Local QuickStart", () => {
  test("should define an object model, open a realm, perform crud operations, and watch a collection", async () => {
    // :code-block-start: local-quickstart-open-a-realm
    const realm = await Realm.open({
      path: "myrealm",
      schema: [TaskSchema],
    });
    // :code-block-end:
    // :code-block-start: local-quickstart-create-realm-objects
    // Add a couple of Tasks in a single, atomic transaction
    // Realm automatically sets the _partition property based on the partitionValue used to open the realm
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

    // :code-block-start: local-quickstart-find-sort-and-filter-objects
    // :code-block-end:
    // :code-block-start: local-quickstart-modify-an-object
    // :code-block-end:
    // :code-block-start: local-quickstart-delete-an-object
    // :code-block-end:
    // :code-block-start: local-quickstart-watch-a-collection
    // :code-block-end:

    realm.write(() => {
      realm.delete(task1);
      realm.delete(task2);
    });

    realm.close();
  });
});
