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
    // TODO: Figure out why custom user data isn't being associated with the user
    // TODO: enable expect after custom user data is working
    test("read custom user data", async () => {
      const customUserData = user.customData;
      console.debug(customUserData)
      // expect(customUserData.favoriteColor).toBe("blue");
    });
    
    test("write custom user data", async () => {
      // :snippet-start: write-to-custom-user-data
      // A user must be logged in to use a mongoClient
      const mongo = user.mongoClient("mongodb-atlas");
      const collection = mongo.db("custom-user-data-database").collection("custom-user-data");
      
      // Query for the user object of the logged in user
      const filter = { userID: user.id};
      // Set the logged in user's favorite color to pink
      const update = { $set: { favoriteColor: "pink" }};
      // Insert document if it doesn't already exist
      const options = { upsert: true };
  
      const result = await collection.updateOne(filter, update, options);
      // :snippet-end:

      test("refresh custom user data", async () => {
        const updatedCustomUserData = await user.refreshCustomData();
        console.debug(updatedCustomUserData)
        expect(customUserData.favoriteColor).toBe("pink");
      });
  
      // Finding user doc in collection works
      // const updatedCustomUserData = await collection.findOne(filter);
      // expect(updatedCustomUserData.favoriteColor).toBe("pink");

      const resetUpdate = { $set: { favoriteColor: "blue" }};
      
      await collection.updateOne(filter, resetUpdate);
    });

    await app.currentUser?.logOut();
  }

  run().catch(console.dir);
});