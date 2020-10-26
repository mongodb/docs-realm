import Realm from "realm";

describe("user authentication", () => {
    let app: any = {};
beforeAll(async () => {
    app = new Realm.App({ id: "tutsbrawl-qfxxj" });

})
test("anonymous login", async () => {
    // :code-block-start: anonymous-login-web
    async function loginAnonymous() {
        // Create an anonymous credential
        const credentials = Realm.Credentials.anonymous();
        try {
          // Authenticate the user
          const user: Realm.User = await app.logIn(credentials);
          // :hide-start:
          expect(user.id).toBe(app.currentUser?.id);  // `App.currentUser` updates to match the logged in user
          // :hide-end:
          return user;
        } catch(err) {
          console.error("Failed to log in", err);
        }
      }
      loginAnonymous().then(user => {
        console.log("Successfully logged in!", user)
      })
    // :code-block-end:
  });
}); 