import Realm from "realm";
const randomEmail = require("random-email"); // random-email does not have typescript @types/random-email
const randomstring = require("randomstring");

let app = new Realm.App({ id: "examples-testers-js-duejt" });
const email = `${randomstring.generate()}@example.com`;
const password = "Pa55w0rd";

/* 
    Steps the app user follows:
    1. Creates an anonymous account to try out the app
    2. Decides to create a more permanent account (email/pass) once they decide they enjoy the app
    3. Links the temporary anonymous account with the permanent
      email-password account in order to retain their user data
    4. Deletes the temporary anonymous account
*/
describe("Linking Identities Tests", () => {
  test("links anon identity with email/pass identity", async () => {
    const anonUser = await app.logIn(Realm.Credentials.anonymous());
    // after using the app for awhile the user decides to register:
    await app.emailPasswordAuth
      .registerUser(email, password)
      .catch((err) =>
        console.log(`An error occurred while registering: ${err}`)
      );
    // :code-block-start: link-identities
    async function linkAccounts(user, email, password) {
      const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
        email,
        password
      );
      const linkedAccount = await user.linkCredentials(
        emailPasswordUserCredentials
      );
      return linkedAccount;
    }
    // :code-block-end:
    expect(linkAccounts(anonUser, email, password)).resolves.toStrictEqual(
      await app.logIn(Realm.Credentials.emailPassword(email, password))
    );
    // delete the anon user after logging in with an anonymous identity, then
    // registering as email/pass identity, then linking the two identities
    if (anonUser) {
      await anonUser
        .logOut()
        .catch((err) =>
          console.log(`An error occurred while logging out: ${err}`)
        );
    }
  });
});
