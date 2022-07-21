import Realm from "realm";

const app = Realm.App.getApp("example-testers-kvjdy");

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
      }
    }
    // :snippet-end:
  });

  test("email/password login", async () => {
    const randomInt = Math.floor(Math.random() * Math.floor(200000));
    const username = "joe.jasper" + randomInt.toString() + "@example.com";
    await app.emailPasswordAuth.registerUser({
      email: username,
      password: "passw0rd",
    });
    // :snippet-start: email-password-login
    // Create an email/password credential
    const credentials = Realm.Credentials.emailPassword(
      // :remove-start:
      username,
      // :remove-end:
      // :uncomment-start:
      // "joe.jasper@example.com",
      // :uncomment-end:
      "passw0rd"
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
      }
    }
    // :snippet-end:
  });

  test("server api key login", async () => {
    process.env.realmServerApiKey = "lolthisisntreallyakey";
    // :snippet-start: server-api-key-login
    // Get the API key from the local environment
    const apiKey = process.env?.realmServerApiKey;
    if (!apiKey) {
      throw new Error("Could not find a Realm Server API Key.");
    }
    // Create an api key credential
    const credentials = Realm.Credentials.serverApiKey(apiKey);
    try {
      const user = await app.logIn(credentials);
      console.log("Successfully logged in!", user.id);
      return user;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to log in", err.message);
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
      }
    }
    // :snippet-end:
  });

  test("logout", async () => {
    const emailPasswordCredentials = Realm.Credentials.emailPassword(
      "joe.jasper@example.com",
      "passw0rd"
    );
    const functionCredentials = Realm.Credentials.function({
      username: "ilovemongodb",
    });
    try {
      const emailPasswordUser = await app.logIn(emailPasswordCredentials);
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
        // :remove-start:
        // The app.allUsers TS type is currently incorrect, ignore the error until a fix is in
        // @ts-ignore
        // :remove-end:
        await app.allUsers[app.currentUser.id].logOut();
      }
      // :snippet-end:
    } catch (err) {
      if (err instanceof Error) {
        console.error("Failed to log in", err.message);
      }
    }
  });
});
