import * as Realm from "realm-web";
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });

describe("User authentication", () => {
  describe.skip("Log in user", () => {
    test("Anonymous log in", () => {
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
      loginAnonymous().then((user) => {
        console.log("Successfully logged in!", user);
      });
      // :snippet-end:
    });
    test("Email/password user", () => {
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
      loginEmailPassword("joe.jasper@example.com", "passw0rd").then((user) => {
        console.log("Successfully logged in!", user);
      });
      // :snippet-end:
    });
    test("API key", () => {
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
      loginApiKey("To0SQOPC...ZOU0xUYvWw").then((user) => {
        console.log("Successfully logged in!", user);
      });
      // :snippet-end:
    });
    test("Custom function", () => {
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
      loginCustomFunction({ username: "mongolover" }).then((user) => {
        console.log("Successfully logged in!", user);
      });
      // :snippet-end:
    });
    test("Custom JWT", () => {
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
    describe("Facebook OAuth", () => {
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
    describe("Google OAuth", () => {
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
    describe("Apple OAuth", () => {
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
  describe("Log Out user", () => {
    test("Log out current user", async () => {
      // :snippet-start: log-out-current-user
      await app.currentUser.logOut();
      // :snippet-end:
    });
    test("Log out specific user", async () => {
      // :snippet-start: log-out-specific-user
      await app.allUsers[2].logOut();
      // :snippet-end
    });
  });
  describe("Manage email/password users", () => {
    test("Register new user", async () => {
      // :snippet-start: register-new-user
      const email = "someone@example.com";
      const password = "Pa55w0rd";
      await app.emailPasswordAuth.registerUser({ email, password });
      // :snippet-end:
    });
    test("Confirm new user email address", async () => {
      // :snippet-start: confirm-new-email
      await app.emailPasswordAuth.confirmUser({ token, tokenId });
      // :snippet-end:
    });
    describe("Retry user confirmation methods", () => {
      test("Resend a confirmation email", async () => {
        // :snippet-start: resend-confirmation-email
        const email = "someone@example.com"; // The user's email address
        await app.emailPasswordAuth.resendConfirmationEmail({ email });
        // :snippet-end:
      });
      test("Retry a user confirmation function", async () => {
        // :snippet-start: retry-user-confirmation-function
        const email = "someone@example.com"; // The user's email address
        await app.emailPasswordAuth.retryCustomConfirmation({ email });
        // :snippet-end:
      });
    });
    describe("Reset user password", () => {
      test("Send a password reset email", async () => {
        // :snippet-start: send-password-reset-email:
        // The user's email address
        const email = "joe.jasper@example.com";
        await app.emailPasswordAuth.sendResetPasswordEmail({ email });
        // :snippet-end:
      });
      test("Call a password reset function", async () => {
        // :snippet-start: call-password-reset-function
        // The user's email address
        const email = "joe.jasper@example.com";
        // The new password to use
        const password = "newPassw0rd";
        // Additional arguments for the reset function
        const args = [];

        await app.emailPasswordAuth.callResetPasswordFunction(
          { email, password },
          args
        );
        // :snippet-end:
      });
      test("Complete a password reset", async () => {
        // :snippet-start: complete-password-reset
        await app.emailPasswordAuth.resetPassword({
          password: "newPassw0rd",
          token,
          tokenId,
        });
        // :snippet-end:
      });
      test("Get the Token and TokenID", () => {
        // :snippet-start: get-token-tokenid
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const tokenId = params.get("tokenId");
        if (!token || !tokenId) {
          throw new Error(
            "You can only call resetPassword() if the user followed a confirmation email link"
          );
        }
        // :snippet-end:
      });
    });
  });
  describe("API key auth", () => {
    test("Create API key", async () => {
      // :snippet-start: create-api-key
      const user = app.currentUser;
      const key = await user.apiKeys.create("apiKeyName");
      // :snippet-end:
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
  describe("Work with multiple users", () => {
    test("Add new user to device", async () => {
      // :snippet-start: add-new-user

      // Log in as Joe
      const joeCredentials = Realm.Credentials.emailPassword(
        "joe@example.com",
        "passw0rd"
      );
      const joe = await app.logIn(joeCredentials);
      // The active user is now Joe
      console.assert(joe.id === app.currentUser.id);

      // Log in as Emma
      const emmaCredentials = Realm.Credentials.emailPassword(
        "emma@example.com",
        "pa55word"
      );
      const emma = await app.logIn(emmaCredentials);
      // The active user is now Emma, but Joe is still logged in
      console.assert(emma.id === app.currentUser.id);
      // :snippet-end:
    });
    test("List all on device users", () => {
      // :snippet-start: list-all-on-device-users
      // Get a list of all Users
      app.allUsers.forEach((user) => {
        console.log(
          `User with id ${user.id} is ${
            user.isLoggedIn ? "logged in" : "logged out"
          }`
        );
      });

      // :snippet-end:
    });
    test("Switch the active user", () => {
      // :snippet-start:switch-active-user
      // Get some logged-in users
      const authenticatedUsers = app.allUsers.filter((user) => user.isLoggedIn);
      const user1 = authenticatedUsers[0];
      const user2 = authenticatedUsers[1];

      // Switch to user1
      app.switchUser(user1);
      // The active user is now user1
      console.assert(app.currentUser.id === user1.id);

      // Switch to user2
      app.switchUser(user2);
      // The active user is now user2
      console.assert(app.currentUser.id === user2.id);
      // :snippet-end:
    });
    test("Remove a user from the device", async () => {
      // :snippet-start: remove-user-from-device
      // Remove the current user from the device
      const user = app.currentUser;
      await app.removeUser(user);

      // The user is no longer the active user
      if (app.currentUser) {
        // The active user is now the logged in user (if there still is one) that was
        // most recently active
        console.assert(user.id !== app.currentUser.id);
      }

      // The user is no longer on the device
      console.assert(
        app.allUsers.find(({ id }) => id === user.id) === undefined
      );
      // :snippet-end:
    });
  });
});
