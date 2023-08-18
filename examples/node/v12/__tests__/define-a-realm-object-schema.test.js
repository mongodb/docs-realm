import Realm from "realm";

describe("Define a Realm Object Schema", () => {
  test("should persist realm objects under the schema name, not class name", async () => {
    const app = new Realm.App({
      id: "js-flexible-oseso",
    });

    const anonymousUser = await app.logIn(Realm.Credentials.anonymous());

    // :snippet-start: remap-class-name
    class Task extends Realm.Object {
      static schema = {
        name: "Todo_Item",
        properties: {
          _id: "int",
          name: "string",
          owner_id: "string?",
        },
        primaryKey: "_id",
      };
    }

    const config = {
      schema: [Task],
      sync: {
        user: anonymousUser,
        flexible: true,
        initialSubscriptions: {
          update: (subs, realm) => {
            subs.add(
              realm
                .objects(`Todo_Item`)
                .filtered(`owner_id == "${anonymousUser.id}"`)
            );
          },
        },
      },
    };

    const realm = await Realm.open(config);
    expect(realm.isClosed).toBe(false); // :remove:

    realm.write(() => {
      realm.create(`Todo_Item`, {
        _id: 12342245,
        owner_id: anonymousUser.id,
        name: "Test the Todo_Item object name",
      });
    });

    const assignedTasks = realm.objects(`Todo_Item`);
    // :snippet-end:

    expect(assignedTasks.length).toBe(1);
    await realm.syncSession?.uploadAllLocalChanges();

    const mongodb = anonymousUser.mongoClient("mongodb-atlas");
    const collection = mongodb.db("JSFlexibleSyncDB").collection("Todo_Item");
    const retrievedTodoItem = await collection.findOne({
      name: "Test the Todo_Item object name",
    });
    expect(retrievedTodoItem?.owner_id).toBe(anonymousUser.id);
    const result = await collection.deleteOne({
      owner_id: anonymousUser.id,
    });
    expect(result.deletedCount).toBe(1);
  }, 30000);

  expect.hasAssertions();
});
