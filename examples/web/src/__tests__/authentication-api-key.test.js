import * as Realm from "realm-web";
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });

describe("API key auth", () => {
  beforeEach(async () => {
    await app.logIn(
      Realm.Credentials.emailPassword({
        email: "hom3r@simpsonfamily.com",
        password: "doh123!",
      })
    );
  });
  afterEach(async () => {
    const user = app.currentUser;
    await user?.logOut();
    const apiKeys = await user.apiKeys.fetchAll();
    const deleteApiKeyPromises = apiKeys.map((key) => {
      return new Promise((resolve, reject) => {
        resolve(user.apiKey.delete(key._id));
      });
    });
    Promise.all(deleteApiKeyPromises);
  });
  test("Create API key", async () => {
    // :snippet-start: create-api-key
    const user = app.currentUser;
    const key = await user.apiKeys.create("apiKeyName");
    // :snippet-end:
    console.log(key);
  });
  test("Look up API key", async () => {
    // :snippet-start: look-up-api-key
    const user = app.currentUser;
    // List all of a user's keys
    const keys = await user.apiKeys.fetchAll();
    // Get a specific key by its ID
    const key = await user.apiKeys.fetch("5eb5931548d79bc784adf46e");
    // :snippet-end:
  });
  test("Enable/Disable API key", async () => {
    // :snippet-start: enable-disable-api-key
    // Get the ID of a User API Key
    const user = app.currentUser;
    const apiKeys = await user.apiKeys.fetchAll();
    const keyId = apiKeys[0]["_id"];

    // Enable the User API Key
    await user.apiKey.enable(keyId);
    // Disable the User API Key
    await user.apiKey.disable(keyId);
    // :snippet-end:
  });

  test("Delete an API key", async () => {
    // :snippet-start: delete-api-key
    // Get the ID of a User API Key
    const user = app.currentUser;
    const apiKeys = await user.apiKeys.fetchAll();
    const keyId = apiKeys[0]["_id"];

    // Delete the User API Key
    await user.apiKey.delete(keyId);
    // :snippet-end:
  });
});
