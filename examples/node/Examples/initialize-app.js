// :snippet-start: anonymous-login
// :snippet-start: initialize
import Realm from "realm";

const appId = "<yourAppId>"; // Set App ID here.
const appConfig = {
  id: appId,
  timeout: 10000
};
// :snippet-end:

async function anonymousLogin() {
  let user;
  try {
    // Pass in the appConfig variable created earlier
    const app = new Realm.App(appConfig);

    // Create an anonymous credential
    const credentials = Realm.Credentials.anonymous(); 
    user = await app.logIn(credentials);
    return user;

  } catch (error) {
      throw `Error logging in anonymously: ${JSON.stringify(error,null,2)}`;
  }
}
// :snippet-end:

// :snippet-start: initial-subscription
// Define team schema
const TeamSchema = {
  name: "Team",
  properties: {
    _id: "int",
    name: "string",
    description: "string?",
  },
  primaryKey: "_id",
};

// Create config object for your realm
const config = {
  sync: {
    user: app.currentUser,
    flexible: true,
    initialSubscriptions: {
      update: (subs, realm) => {
        subs.add(
          realm.objects("Team").filtered("name == 'Developer Education'")
        );
      },
    },
  },
};

const realm = await Realm.open(config);
// :snippet-end: