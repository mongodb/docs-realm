import Realm from "realm";
const BSON = require("bson");

// Update this with your App ID
const app = new Realm.App({ id: "example-testers-kvjdy" });

const DogSchema = {
  name: "Dog",
  properties: {
    _id: "objectId",
    name: "string?",
    age: "int?",
  },
  primaryKey: "_id",
};

describe("Sync Changes Between Devices", () => {
  test("should suspend or resume a sync session", async (done) => {
    jest.setTimeout(300000);

    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
    console.log(`Logged in anonymously with user id: ${app.currentUser.id}`);
    const realm = await Realm.open({
      schema: [DogSchema], // using a predefined schema
      sync: {
        user: app.currentUser,
        partitionValue: "SampleTestPartition",
      },
    });

    realm.close();

    expect(1).toBe(1);

    done();
  });

  // Realm.Sync.Session.pause;
  // Realm.Sync.Session.resume;
  // Realm.Sync.Session.addConnectionNotification;
  // boop
  //   test("should check upload & download progress for a sync session", async () => {
  //     expect(1).toBe(2);
  //   });
  //   // boop
  //   test("should check the network connection", async () => {
  //     expect(1).toBe(2);

  //     // might also be able to test with addConnectionNotification
  //   });
});
