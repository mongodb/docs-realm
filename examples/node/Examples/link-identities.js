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

describe("Linking Identities Tests", () => {
  test("links anon identity with email/pass identity", async () => {
    // The application user creates an anonymous account
    const anonUser = await app.logIn(Realm.Credentials.anonymous());

    // after using the app for a while the user decides to register:
    await registerNewAccount(email, password);

    // the accounts are linked
    expect(linkAccounts(anonUser, email, password)).resolves.toStrictEqual(
      await app.logIn(Realm.Credentials.emailPassword(email, password))
    ); // an anonymous account is linked to an email/pass account, the linked account should retain the credentials of the email/pass account.
    anonUser.logOut(); // delete the anonymous user
  });
});
