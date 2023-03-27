import { Realm, App, BSON, Credentials } from "realm";

const app = new App({ id: "playground-kmcdm" });

describe("Relationships and Embedded Objects Tests", () => {
  test("should obtain an inverse relationship dynamically", async () => {
    // :snippet-start: obtain-inverse-relationship-dynamically
    const User = {
      name: "User",
      primaryKey: "_id",
      properties: {
        _id: "objectId",
        _partition: "string?",
        name: "string",
        tasks: "Task[]",
      },
    };
    const Task = {
      name: "Task",
      primaryKey: "_id",
      properties: {
        _id: "objectId",
        _partition: "string?",
        text: "string",
      },
    };
    // :remove-start:
    const appUser = await app.logIn(Credentials.anonymous());
    const realm = await Realm.open({
      schema: [User, Task],
      sync: {
        user: appUser,
        partitionValue: "MyInverseRelationshipApp",
      },
    });

    let user: { tasks: any[] } | null,
      task: { linkingObjects: (arg0: string, arg1: string) => any[] } | null;
    realm.write(() => {
      user = realm.create("User", {
        _id: new BSON.ObjectId(),
        name: "Joe Smith",
      });
      task = realm.create("Task", {
        _id: new BSON.ObjectId(),
        text: "go grocery shopping",
        status: "Open",
      });

      user.tasks.push(task);
      // :remove-end:

      // get the User who owns the task
      const linkedUser = task.linkingObjects("User", "tasks")[0];
      // :snippet-end:

      expect(linkedUser.name).toBe("Joe Smith");
      expect(linkedUser.tasks[0].text).toBe("go grocery shopping");
    });

    // Delete the objects & cleanup
    realm.write(() => {
      realm.delete(user);
      realm.delete(task);
      user = null;
      task = null;
    });
    realm.close();
    appUser.logOut();
  });
});
