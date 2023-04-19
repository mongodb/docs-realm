import Realm from "realm";

// :snippet-start: get-app-instance
// :replace-start: {
//   "terms": {
//     "example-testers-kvjdy": "<yourAppId>"
//   }
// }
const app = Realm.App.getApp("example-testers-kvjdy");
// :replace-end:
// :snippet-end:

const randomInt = Math.floor(Math.random() * Math.floor(200000));
const testUsername = "someone" + randomInt.toString() + "@example.com";
const testPassword = "Pa55w0rd!";

describe("user authentication", () => {
  afterEach(async () => {
    await app.currentUser?.logOut();
    jest.runAllTimers();
  });

  test("anonymous login", async () => {
    // :snippet-start: anonymous-login
    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      // :remove-start:
      expect(user.id).toBe(app.currentUser?.id);
      // :remove-end:
      console.log("Successfully logged in!", user.id);
      return user;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to log in", err.message);
        // :remove-start:
        throw new Error("Anonymous login failed:" + err.message);
        // :remove-end:
      }
    }
    // :snippet-end:
  });

  test("email/password login", async () => {
    await app.emailPasswordAuth.registerUser({
      email: testUsername,
      password: testPassword,
    });
    // :snippet-start: email-password-login
    // :replace-start: {
    //    "terms": {
    //       "testUsername": "\"someone@example.com\"",
    //       "testPassword": "\"Pa55w0rd!\""
    //    }
    // }
    // Create an email/password credential
    const credentials = Realm.Credentials.emailPassword(
      testUsername,
      testPassword
    );
    try {
      const user = await app.logIn(credentials);
      // :remove-start:
      expect(user.id).toBe(app.currentUser?.id);
      // :remove-end:
      console.log("Successfully logged in!", user.id);
      return user;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to log in", err.message);
        // :remove-start:
        throw new Error("Email/password login failed:" + err.message);
        // :remove-end:
      }
    }
    // :replace-end:
    // :snippet-end:
  });

  test("server api key login", async () => {
    process.env.appServicesApiKey = "yeXX078iJrxtez1s7UI6yqSqy2XBadEUnPPoKFit4XVG51HLRWoZcy2axlAaA8Qk";
    // :snippet-start: server-api-key-login
    // Get the API key from the local environment
    const apiKey = process.env?.appServicesApiKey;
    if (!apiKey) {
      throw new Error("Could not find an App Services Server API Key.");
    }
    // Create an api key credential
    const credentials = Realm.Credentials.apiKey(apiKey);
    try {
      const user = await app.logIn(credentials);
      // :remove-start:
      expect(user.id).toBe(app.currentUser?.id);
      // :remove-end:
      console.log("Successfully logged in!", user.id);
      return user;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to log in", err.message);
        // :remove-start:
        throw new Error("API Key login failed:" + err.message);
        // :remove-end:
      }
    }
    // :snippet-end:
  });

  test("custom function login", async () => {
    // :snippet-start: custom-function-login
    // Create a custom function credential
    const credentials = Realm.Credentials.function({ username: "ilovemongodb" });
    try {
      const user = await app.logIn(credentials);
      // :remove-start:
      expect(user.id).toBe(app.currentUser?.id);
      // :remove-end:
      console.log("Successfully logged in!", user.id);
      return user;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to log in", err.message);
        // :remove-start:
        throw new Error("Custom function login failed:" + err.message);
        // :remove-end:
      }
    }
    // :snippet-end:
  });

  test("custom jwt login", async () => {
    const authenticateWithExternalSystem = () => {
      // Simulates returning the following JWT information from an external auth service
      // JWT: {
      //   header: {
      //     "alg": "HS256",
      //     "typ": "JWT",
      //   },
      //   payload: {
      //     "aud": "example-testers-kvjdy",
      //     "sub": "example-user",
      //     "exp": 1918062398,
      //     "name": "Joe Jasper",
      //   },
      //   secret: "E7DE0D13D66BF64EC9A9A74A3D600E840D39B4C12832D380E48ECE02070865AB"
      // }
      //
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJleGFtcGxlLXRlc3RlcnMta3ZqZHkiLCJzdWIiOiJleGFtcGxlLXVzZXIiLCJuYW1lIjoiSm9lIEphc3BlciIsImV4cCI6MTkxODA2MjM5OH0.3wR1cJN4zlbbDh7IaYyDX0fasNEW3grJCdv_7lQFnPI";
    };
    // :snippet-start: custom-jwt-login
    // Create a custom jwt credential
    const jwt = await authenticateWithExternalSystem();
    const credentials = Realm.Credentials.jwt(jwt);
    try {
      const user = await app.logIn(credentials);
      // :remove-start:
      expect(user.id).toBe(app.currentUser?.id);
      // :remove-end:
      console.log("Successfully logged in!", user.id);
      return user;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to log in", err.message);
        // :remove-start:
        throw new Error("Custom JWT login failed:" + err.message);
        // :remove-end:
      }
    }
    // :snippet-end:
  });

  test("logout", async () => {
    const emailPasswordCredentials = Realm.Credentials.emailPassword(
      testUsername,
      testPassword
    );
    const functionCredentials = Realm.Credentials.function({
      username: "ilovemongodb",
    });
    await Promise.all(Object.values(app.allUsers).map((user) => user.logOut()));
    try {
      const emailPasswordUser = await app.logIn(emailPasswordCredentials);
      expect(emailPasswordUser.id).toBe(app.currentUser?.id);
      const functionUser = await app.logIn(functionCredentials);
      expect(functionUser.id).toBe(app.currentUser?.id);

      // :snippet-start: logout
      // Log out the current user
      await app.currentUser?.logOut();
      // :remove-start:
      expect(emailPasswordUser.id).toBe(app.currentUser?.id);
      // :remove-end:
      // Log out a specific user by ID
      if (app.currentUser) {
        await app.allUsers[app.currentUser.id].logOut();
      }
      // :snippet-end:
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to log out", err.message);
        // :remove-start:
        throw new Error("Logout failed:" + err.message);
        // :remove-end:
      }
    }
  });
});

describe("User Sessions", () => {
  afterEach(async () => {
    await app.currentUser?.logOut();
    jest.runAllTimers();
  });

  test("Get a User Access Token", async () => {
    const email = "someone@example.com";
    const password = "pa55w0rd!";
    try {
      await app.logIn(Realm.Credentials.emailPassword(email, password));
    } catch (err) {
      await app.emailPasswordAuth.registerUser({ email, password });
      await app.logIn(Realm.Credentials.emailPassword(email, password));
    }
    // :snippet-start: get-user-access-token
    // Gets a valid user access token to authenticate requests
    async function getValidAccessToken(user: Realm.User) {
      // An already logged in user's access token might be stale. To
      // guarantee that the token is valid, refresh it if necessary.
      await user.refreshCustomData();
      return user.accessToken;
    }
    // :snippet-end:
    const token = await getValidAccessToken(app.currentUser!);
    expect(token).not.toBe(undefined);
  });
});
