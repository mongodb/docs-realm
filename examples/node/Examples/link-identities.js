import Realm from "realm";
import randomEmail from "random-email";

const app = new Realm.App({ id: process.env.REALM_APP_ID });
const email = randomEmail({ domain: "example.com" });
const password = "Pa55w0rd";
async function registerNewAccount(email, password) {
  await app.emailPasswordAuth
    .registerUser(email, password)
    .catch((err) =>
      console.log(
        `An error occurred while registering: ${JSON.stringify(err, 2, null)}`
      )
    );
}

/* 
    Steps the app user follows:
    1. Creates an anonymous account to try out the app
    2. Decides to create a permanent account (email/pass) once they decide they enjoy the app
    3. Links the temporary anonymous account with the permanent
       email-password account in order to retain their user data
    4. Deletes the temporary anonymous account
*/
describe("Linking Identities Tests", () => {
  test("links anon identity with email/pass identity", async () => {
    // after using the app for a while the user decides to register:
    await registerNewAccount(email, password);

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

    const anonUser = await app.logIn(Realm.Credentials.anonymous());

    expect(linkAccounts(anonUser, email, password)).resolves.toStrictEqual(
      await app.logIn(Realm.Credentials.emailPassword(email, password))
    ); // when an anonymous account is linked to an email/pass account, the linked account retains the credentials of the email/pass account.
    anonUser.logOut(); // delete the anonymous user
  });
});
