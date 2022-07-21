import * as Realm from "realm-web";
import { getIdToken } from "firebase/auth";
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });
jest.setTimeout(15000);
describe("Log in user", () => {
  beforeAll(async () => {
    try {
      await app.emailPasswordAuth.registerUser({
        email: "joe.jasper@example.com",
        password: "passw0rd",
      });
    } catch (err) {
      console.log("account already exists for: ");
      console.log("email:", "joe.jasper@example.com");
      console.log("password:", "passw0rd");
    }
  });
  // afterEach(async () => {
  //   await app?.currentUser?.logOut();
  // });
  test("Anonymous log in", async () => {
    // :snippet-start: anon-auth
    async function loginAnonymous() {
      // Create an anonymous credential
      const credentials = Realm.Credentials.anonymous();
      try {
        // Authenticate the user
        const user = await app.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        console.assert(user.id === app.currentUser.id);
        return user;
      } catch (err) {
        console.error("Failed to log in", err);
      }
    }
    const user = await loginAnonymous();
    console.log("Successfully logged in!", user.id);

    // :snippet-end:
    expect(app.currentUser.isLoggedIn).toBe(true);
    expect(app.currentUser?.id).toBe(user.id);
  });
  test("Email/password user", async () => {
    // :snippet-start: email-password-auth
    async function loginEmailPassword(email, password) {
      // Create an anonymous credential
      const credentials = Realm.Credentials.emailPassword(email, password);
      try {
        // Authenticate the user
        const user = await app.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        console.assert(user.id === app.currentUser.id);
        return user;
      } catch (err) {
        console.error("Failed to log in", err);
      }
    }

    const user = await loginEmailPassword("joe.jasper@example.com", "passw0rd");
    console.log("Successfully logged in!", user);
    // :snippet-end:
    expect(app.currentUser.isLoggedIn).toBe(true);
    expect(app.currentUser?.id).toBe(user.id);
  });
  test("API key", async () => {
    const baseUser = await app.logIn(
      Realm.Credentials.emailPassword("joe.jasper@example.com", "passw0rd")
    );
    const now = new Date();
    const nonce = now.getTime();
    const REALM_API_KEY = await baseUser.apiKeys.create("myKey" + nonce);
    console.log({ REALM_API_KEY });
    // :snippet-start: api-key-auth
    async function loginApiKey(apiKey) {
      // Create an API Key credential
      const credentials = Realm.Credentials.apiKey(apiKey);
      try {
        // Authenticate the user
        const user = await app.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        console.assert(user.id === app.currentUser.id);
        return user;
      } catch (err) {
        console.error("Failed to log in", err);
      }
    }
    const user = await loginApiKey(REALM_API_KEY.key); // add previously generated API key
    console.log("Successfully logged in!", user);
    // :snippet-end:
    expect(app.currentUser.isLoggedIn).toBe(true);
    expect(app.currentUser?.id).toBe(user.id);
  });
  test.skip("Custom function", () => {
    // :snippet-start: custom-function-auth
    async function loginCustomFunction(payload) {
      // Create a Custom Function credential
      const credentials = Realm.Credentials.function(payload);
      try {
        // Authenticate the user
        const user = await app.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        console.assert(user.id === app.currentUser.id);
        return user;
      } catch (err) {
        console.error("Failed to log in", err);
      }
    }
    loginCustomFunction({ username: "ilovemongodb" }).then((user) => {
      console.log("Successfully logged in!", user);
    });
    // :snippet-end:
  });
  // TODO
  test.skip("Custom JWT", () => {
    // :snippet-start: custom-jwt
    async function loginCustomJwt(jwt) {
      // Create a Custom JWT credential
      const credentials = Realm.Credentials.jwt(jwt);
      try {
        // Authenticate the user
        const user = await app.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        console.assert(user.id === app.currentUser.id);
        return user;
      } catch (err) {
        console.error("Failed to log in", err);
      }
    }
    loginCustomJwt("eyJ0eXAi...Q3NJmnU8oP3YkZ8").then((user) => {
      console.log("Successfully logged in!", user);
    });
    // :snippet-end:
  });
  test.skip("Firebase with Custom JWT", async () => {
    const realmApp = app;
    const firebaseUser = {};
    // :snippet-start: custom-jwt-firebase
    // ... log user into Firebase & initialize Realm app

    // Using modular Firebase Web v9 SDK method auth.getIdToken()
    // See Firebase docs - https://firebase.google.com/docs/reference/js/auth#getidtoken
    const token = await getIdToken(firebaseUser);
    const credentials = Realm.Credentials.jwt(token);
    const realmUser = await realmApp.logIn(credentials);
    // :snippet-end:
  });
  // TODO
  describe.skip("Facebook OAuth", () => {
    test("Built-in Facebook OAuth", () => {
      // :snippet-start: builtin-facebook-oauth
      // The redirect URI should be on the same domain as this app and
      // specified in the auth provider configuration.
      const redirectUri = "https://app.example.com/handleOAuthLogin";
      const credentials = Realm.Credentials.facebook(redirectUri);

      // Calling logIn() opens a Facebook authentication screen in a new window.
      app.logIn(credentials).then((user) => {
        // The logIn() promise will not resolve until you call `handleAuthRedirect()`
        // from the new window after the user has successfully authenticated.
        console.log(`Logged in with id: ${user.id}`);
      });

      // When the user is redirected back to your app, handle the redirect to
      // save the user's access token and close the redirect window. This
      // returns focus to the original application window and automatically
      // logs the user in.
      Realm.handleAuthRedirect();
      // :snippet-end:
    });
    test("Facebook SDK OAuth", () => {
      // :snippet-start: facebook-sdk-oauth
      // Get the access token from the Facebook SDK
      const { accessToken } = FB.getAuthResponse();
      // Define credentials with the access token from the Facebook SDK
      const credentials = Realm.Credentials.facebook(accessToken);
      // Log the user in to your app
      app.logIn(credentials).then((user) => {
        console.log(`Logged in with id: ${user.id}`);
      });
      // :snippet-end:
    });
  });
  // TODO
  describe.skip("Google OAuth", () => {
    test("Built-in Google OAuth", () => {
      // :snippet-start: builtin-google-oauth
      // TODO: add abstracted example
      // :snippet-end:
    });
    test("Google Onetap OAuth", () => {
      // :snippet-start: google-onetap-oauth
      // TODO: Add abstracted example
      // :snippet-end:
    });
  });
  // TODO
  describe.skip("Apple OAuth", () => {
    test("Built-in Apple OAuth", () => {
      // :snippet-start: builtin-apple-oauth
      // The redirect URI should be on the same domain as this app and
      // specified in the auth provider configuration.
      const redirectUri = "https://app.example.com/handleOAuthLogin";
      const credentials = Realm.Credentials.apple(redirectUri);

      // Calling logIn() opens an Apple authentication screen in a new window.
      app.logIn(credentials).then((user) => {
        // The logIn() promise will not resolve until you call `handleAuthRedirect()`
        // from the new window after the user has successfully authenticated.
        console.log(`Logged in with id: ${user.id}`);
      });

      // When the user is redirected back to your app, handle the redirect to
      // save the user's access token and close the redirect window. This
      // returns focus to the original application window and automatically
      // logs the user in.
      Realm.handleAuthRedirect();
      // :snippet-end:
    });
    test("Apple SDK OAuth", () => {
      // :snippet-start: apple-sdk-oauth
      // Get the ID token from the Apple SDK
      AppleID.auth
        .signIn()
        .then(({ id_token }) => {
          // Define credentials with the ID token from the Apple SDK
          const credentials = Realm.Credentials.apple(id_token);
          // Log the user in to your app
          return app.logIn(credentials);
        })
        .then((user) => {
          console.log(`Logged in with id: ${user.id}`);
        });
      // :snippet-end:
    });
  });
});
describe("Log out user", () => {
  beforeAll(async () => {
    const userIds = [...Object.keys(app.allUsers)];

    for await (const userId of userIds) {
      await app.deleteUser(app.allUsers[userId]);
    }

    try {
      await app.emailPasswordAuth.registerUser({
        email: "ian.jasper@example.com",
        password: "passw0rd",
      });
    } catch (err) {
      console.log("accounts already exist");
    }
    try {
      await app.emailPasswordAuth.registerUser({
        email: "mark.jasper@example.com",
        password: "passw0rd",
      });
    } catch (err) {
      console.log("accounts already exist");
    }
    try {
      await app.emailPasswordAuth.registerUser({
        email: "steve.jasper@example.com",
        password: "passw0rd",
      });
    } catch (err) {
      console.log("accounts already exist");
    }
    try {
      await app.emailPasswordAuth.registerUser({
        email: "bob.jasper@example.com",
        password: "passw0rd",
      });
    } catch (err) {
      console.log("accounts already exist");
    }
  });
  afterAll(async () => {
    const userIds = [...Object.keys(app.allUsers)];

    for await (const userId of userIds) {
      console.log(userIds);
      await app.deleteUser(app.allUsers[userId]);
    }
  });
  test("Log out current user", async () => {
    const credentials = Realm.Credentials.emailPassword(
      "ian.jasper@example.com",
      "passw0rd"
    );
    const user = await app.logIn(credentials);
    expect(user.isLoggedIn).toBe(true);
    // :snippet-start: log-out-current-user
    await app.currentUser.logOut();
    // :snippet-end:
    expect(user.isLoggedIn).toBe(false);
    expect(app.currentUser).toBe(null);
    await app.logIn(credentials);
  });
  test("Log out specific user", async () => {
    const user1 = await app.logIn(
      Realm.Credentials.emailPassword("bob.jasper@example.com", "passw0rd")
    );
    const user2 = await app.logIn(
      Realm.Credentials.emailPassword("mark.jasper@example.com", "passw0rd")
    );
    const user3Creds = Realm.Credentials.emailPassword(
      "steve.jasper@example.com",
      "passw0rd"
    );
    const user3 = await app.logIn(user3Creds);
    // :snippet-start: log-out-specific-user
    const userId = app.currentUser.id;
    await app.allUsers[userId].logOut();
    // :snippet-end:
    await app.logIn(user3Creds);
  });
});
