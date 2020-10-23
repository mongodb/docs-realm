import * as Realm from "realm-web";

describe("user authentication", () => {
    let app;
    // Set the app up with test users
    beforeAll(async () => {
        app = new Realm.App({ id: "tutsbrawl-qfxxj" });
    })

    test("anonymous login", async () => {
        async function loginAnonymous() {
            // Create an anonymous credential
            const credentials = Realm.Credentials.anonymous();
            try {
              // Authenticate the user
              const user = await app.logIn(credentials);
              // `App.currentUser` updates to match the logged in user
              return user;
            } catch(err) {
              console.error("Failed to log in", err);
            }
          }
          loginAnonymous().then(user => {
            console.log("Successfully logged in!", user)
          })
      });
})