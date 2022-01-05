import Realm from "realm";

const PersonSchema = {
  name: "Person",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    age: "int",
    name: "string",
    friends: "Person[]",
    bestFriend: "Person",
  },
};

const app = new Realm.App({ id: "flexsyncjstest-smixl" });

describe("Flexible Sync Tests", () => {
  test.skip("should open a FS realm, ", async () => {
    const user = await app.logIn(Realm.Credentials.anonymous());

    // :code-block-start: open-flexible-sync-realm
    const realm = await Realm.open({
      schema: [PersonSchema],
      sync: {
        user: app.currentUser,
        flexible: true,
      },
    });
    // :code-block-end:
  });
});
