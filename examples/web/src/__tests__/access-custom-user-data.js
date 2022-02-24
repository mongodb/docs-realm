import * as Realm from "realm-web";
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });

// TODO: add custom user data tests
describe("Custom User Data", () => {
  test("Read custom user data", () => {
    // :snippet-start: read-custom-user-data
    // Access a logged in user's read-only custom data
    const customData = app.currentUser.customData;
    console.log(customData);
    // :snippet-end:
  });
  test("Refresh custom user data", async () => {
    // :snippet-start: refresh-custom-user-data
    // Refresh a user's custom data to make sure we have the latest version
    await app.currentUser.refreshCustomData();
    // :snippet-end:
  });
  test("Modify custom user data", async () => {
    // :snippet-start: modify-custom-user-data
    // Get a client object for your app's custom user data collection
    const mongo = app.services.mongodb("<MongoDB Service Name>");
    const collection = mongo
      .db("<Database Name>")
      .collection("<Collection Name>");

    // Log the user's favorite color before we change it
    console.log(
      "old favoriteColor: ",
      app.currentUser.customData.favoriteColor
    );

    // Update the user's custom data document
    await collection.updateOne(
      { userID: app.currentUser.id }, // Query for the user object of the logged in user
      { $set: { favoriteColor: "purple" } } // Set the logged in user's favorite color to purple
    );
    // Refresh the user's local customData property
    await app.currentUser.refreshCustomData();

    // Log the user's new favorite color
    console.log(
      "new favoriteColor: ",
      app.currentUser.customData.favoriteColor
    );
    // :snippet-end:
  });
});
