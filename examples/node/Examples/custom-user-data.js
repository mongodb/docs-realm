import Realm from "realm";

const app = new Realm.App({ id: "example-testers-kvjdy" });
const credentials = Realm.Credentials.emailPassword(
  "test@example.com",
  "pa55w0rd"
);

describe("user custom data", () => {
  async function run() {
    let user;

    test("log user in", async () => {
      try {
        user = await app.logIn(credentials);
        expect(user.id).toBe(app.currentUser.id);
        console.log("Successfully logged in!", user.id);
      } catch (err) {
        console.log("Failed to log in", err.message);
      }
    });

    test("read custom user data", async () => {
      // :snippet-start: read-custom-user-data
      const customUserData = user.customData;
      console.log(customUserData);
      // :snippet-end:
      expect(customUserData.favoriteColor).toBe("blue");
    });
    
    test("write custom user data", async () => {
      // :snippet-start: write-custom-user-data
      // A user must be logged in to use a mongoClient
      const mongo = user.mongoClient("mongodb-atlas");
      const collection = mongo.db("custom-user-data-database").collection("custom-user-data");
      
      // Query for the user object of the logged in user
      const filter = { userId: user.id};
      // Set the logged in user's favorite color to pink
      const update = { $set: { favoriteColor: "pink" }};
      // Insert document if it doesn't already exist
      const options = { upsert: true };
  
      const result = await collection.updateOne(filter, update, options);
      // :snippet-end:

      // :snippet-start: refresh-custom-user-data
      const updatedCustomUserData = await user.refreshCustomData();
      console.log(updatedCustomUserData);
      // :snippet-end:
      expect(updatedCustomUserData.favoriteColor).toBe("pink");
      
      // Reset `favoriteColor` to "blue" so that the test works properly when
      // run again.
      const resetUpdate = { $set: { favoriteColor: "blue" }};
      await collection.updateOne(filter, resetUpdate);
      await user.refreshCustomData();
    });

    await app.currentUser?.logOut();
  }

  run().catch(console.dir);
});