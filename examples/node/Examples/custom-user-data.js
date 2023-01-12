import Realm from "realm";

const app = new Realm.App({ id: "example-testers-kvjdy" });

describe("user custom data", () => {
  // :snippet-start: user-data-object
  const customUserDataObject = {
    id: '5f1f216e82df4a7979f9da93',
    type: 'normal',
    custom_data: {
      _id: '5f20d083a37057d55edbdd57',
      userID: '5f1f216e82df4a7979f9da93',
      description: 'a test document for user: test@test.com',
    },
    data: { email: 'test@test.com' },
    identities: [
      { id: '5f1f216e82df4a7979f9da90', provider_type: 'local-userpass' }
    ]
  }
  // :snippet-end:

  // :snippet-start: output
  const output = {
    "_id":"5f233a3ac49aca916792de1d",
    "description":"a test document for user test@test.com",
    "userID":"5f1f298f757611faec901d0f",
    "favoriteColor":"pink"
  }
  // :snippet-end:

  test.skip("complete example", async () => {

    async function run() {
      let user;
      try {
        const credentials = Realm.Credentials.emailPassword(
          "test@test.com",
          "<password>"
        );
        
        // :snippet-start: write-to-custom-user-data
        // A user must be logged in to use a mongoClient
        const user = await app.logIn(credentials);
        console.log(user.id);
        const mongo = user.mongoClient("<atlasServiceName>");
        const collection = mongo.db("<databaseName>").collection("<collectionName>");

        const filter = {
          // Query for the user object of the logged in user
          userID: user.id,
        };

        const updateDoc = {
          // Set the logged in user's favorite color to pink
          $set: {
            favoriteColor: "pink",
          },
        };

        const result = await collection.updateOne(filter, updateDoc);
        console.log(result);

        // Console output: { matchedCount: 1, modifiedCount: 1 }
        // :snippet-end:

        const customUserData = await user.refreshCustomData();
        console.log(customUserData);
      } finally {
        user.logOut();
      }
    }
    run().catch(console.dir);
  });
});