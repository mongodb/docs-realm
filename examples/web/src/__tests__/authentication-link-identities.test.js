import * as Realm from "realm-web";
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });

// TODO
describe("Link user identities", () => {
  test("Link Accounts", () => {
    // :snippet-start: link-accounts
    async function linkAccounts(user, email, password) {
      const emailPasswordUserCredentials = Realm.Credentials.emailPassword(
        email,
        password
      );
      await user.linkCredentials(emailPasswordUserCredentials);
    }
    // :snippet-end:
  });
});
