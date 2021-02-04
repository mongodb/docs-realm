import Realm from "realm";
import randomEmail from "random-email";

let app;
let anonUser;
const email = randomEmail({ domain: "example.com" });
const password = "Pa55w0rd";

const credentials = Realm.Credentials.emailPassword(email, password);

async function registerNewAccount(email, password) {
  await app.emailPasswordAuth
    .registerUser(email, password)
    .catch((err) =>
      console.log(
        `An error occurred while registering: ${JSON.stringify(err, 2, null)}`
      )
    );
}

beforeAll(async () => {
  /* Unit Testing Setup: */
  app = new Realm.App({ id: "tutsbrawl-qfxxj" });
  // Delete all users to start from scratch
  const tempUser = await app.logIn(Realm.Credentials.anonymous());
  await tempUser.functions.deleteAllUsers();

  // application user tries out the app by logging in anonymously
  anonUser = await app.logIn(Realm.Credentials.anonymous());

  // after using the app for a while the user decides to register:
  await registerNewAccount(email, password);
});

afterAll(async () => {
  async function deleteAnonUser(anonUser) {
    // logging out of an anonymous user will delete the user
    await anonUser
      .logOut()
      .catch((err) =>
        console.log(
          `An error occurred while logging out: ${JSON.stringify(err, 2, null)}`
        )
      );
  }
  // delete the anon user after logging in with an anonymous identity, then
  // registering as email/pass identity, then linking the two identities
  if (anonUser) {
    await deleteAnonUser(anonUser);
  }
});

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
    anonUser.logOut();
    const freshAnonUser = await app.logIn(Realm.Credentials.anonymous());
    expect(linkAccounts(freshAnonUser, email, password)).resolves.toStrictEqual(
      await app.logIn(credentials)
    );
  });
});
