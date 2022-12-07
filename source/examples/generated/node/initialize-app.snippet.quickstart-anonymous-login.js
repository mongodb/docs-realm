import Realm from "realm";

const appId = "<yourAppId>"; // Set App ID here.
const appConfig = {
  id: appId,
  timeout: 10000
};

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
