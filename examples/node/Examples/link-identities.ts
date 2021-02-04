import Realm from "realm";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomEmail = require("random-email"); // random-email does not have typescript @types/random-email

// Define Process Variable - App ID
const appId: string = process.env.REALM_APP_ID as string;
const app = new Realm.App({ id: appId });

const email = randomEmail({ domain: "example.com" });
const password = "Pa55w0rd";

async function registerNewAccount(email: string, password: string) {
  await app.emailPasswordAuth
    .registerUser(email, password)
    .catch((err) => console.log(`An error occurred while registering: ${err}`));
}

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
    // :code-block-start: link-identities
    async function linkAccounts(
      user: Realm.User,
      email: string,
      password: string
    ) {
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
    anonUser.logOut();
    const freshAnonUser = await app.logIn(Realm.Credentials.anonymous());
    expect(linkAccounts(freshAnonUser, email, password)).resolves.toStrictEqual(
      await app.logIn(credentials)
    );
  });
});
