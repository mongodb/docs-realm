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

// :code-block-start: link-identities
async function linkAccounts(user: Realm.User, email: string, password: string) {
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

    // an anonymous account is linked to an email/pass account, the linked
    // account should retain the credentials of the email/pass account.
    const linkedUser = await linkAccounts(anonUser, email, password);
    console.log("linkedUser --", linkedUser);
    // // delete the anonymous user since it has been linked to the email/password user
    // anonUser.logOut();
    const emailPassWordUser = await app.logIn(
      Realm.Credentials.emailPassword(email, password)
    );
    expect(linkedUser).resolves.toStrictEqual(emailPassWordUser);
  });
});
