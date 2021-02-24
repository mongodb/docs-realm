import Realm from "realm";
import fs from "fs";

const DogSchema = {
  name: "Dog",
  properties: {
    name: "string",
    age: "int?",
  },
};

describe("Sync Changes Between Devices", () => {
  // this test is skipped because we currently are unable to test Synced Realms
  // via jest, to track the progress of this issue see: https://jira.mongodb.org/browse/RJS-1008
  test.skip("should perform a client reset", async () => {
    const app = new Realm.App({ id: "<Your App ID>" });
    const credentials = Realm.Credentials.anonymous();
    await app.logIn(credentials);
    // :code-block-start: sync-changes-between-devices-perform-a-client-reset
    let realm = await Realm.open(config);
    function errorSync(_session, error) {
      if (realm) {
        if (error.name === "ClientReset") {
          const realmPath = "<Your Realm Path>";

          realm.close();

          console.log(`Error ${error.message}, need to reset ${realmPath}…`);
          Realm.App.Sync.initiateClientReset(app, realmPath); // pass your realm app instance, and realm path to initiateClientReset()
          console.log(`Creating backup from ${error.config.path}…`);
          // Move backup file to a known location for a restore
          fs.renameSync(error.config.path, realmPath + "~");
          // Discard the reference to the realm instance
          realm = null;
        } else {
          console.log(`Received error ${error.message}`);
        }
      }
    }
    var config = {
      schema: [DogSchema], // predefined schema
      sync: {
        user: app.currentUser,
        partitionValue: "MyPartitionValue",
        error: errorSync,
      },
    };
    // :code-block-end:
    expect(1).toBe(2);
    realm.close();
  });
});
