const inquirer = require("inquirer");
const Realm = require("realm");
const index = require("./index");
const config = require("./config");
const main = require("./main");
const output = require("./output");

const REALM_APP_ID = config.realmAppId;
const appConfig = {
  id: REALM_APP_ID,
  timeout: 10000,
};

// :code-block-start: newRealmApp
const app = new Realm.App(appConfig);
/*  Change the logLevel to increase or decrease the
    amount of messages you see in the console.
    Valid options are:
    fatal, error, warn, info, detail, debug, and trace
*/
Realm.App.Sync.setLogLevel(app, "error");

// :code-block-end:

// :code-block-start: userLogin
async function logIn() {
  const input = await inquirer.prompt([
    {
      type: "input",
      name: "email",
      message: "Email:",
    },
    {
      type: "password",
      name: "password",
      message: "Password:",
      mask: "*",
    },
  ]);

  try {
    // :state-start: final
    const credentials = Realm.Credentials.emailPassword(
      input.email,
      input.password
    );
    // :state-end: :state-uncomment-start: start
    // // TODO: create new emailPassword credentials and assign it to ``credentials``
    //const credentials;
    // :state-uncomment-end:

    // :state-start: final
    const user = await app.logIn(credentials);
    // :state-end: :state-uncomment-start: start
    // // TODO: call the app.logIn() method and assign its value to ``user``
    //const user;

    // :state-uncomment-end:
    if (user) {
      output.result("You have successfully logged in as " + app.currentUser.id);
      return main.mainMenu();
    } else {
      output.error("There was an error logging you in");
      return logIn();
    }
  } catch (err) {
    output.error(err.message);
    return logIn();
  }
}
// :code-block-end:

async function registerUser() {
  output.header("WELCOME, NEW USER");
  const input = await inquirer.prompt([
    {
      type: "input",
      name: "email",
      message: "Email:",
    },
    {
      type: "password",
      name: "password",
      message: "Password:",
      mask: "*",
    },
  ]);

  try {
    await app.emailPasswordAuth.registerUser({
      email: input.email,
      password: input.password,
    });
    const credentials = Realm.Credentials.emailPassword(
      input.email,
      input.password
    );
    const user = await app.logIn(credentials);
    if (user) {
      output.result(
        "You have successfully created a new Realm user and are now logged in."
      );
      return main.mainMenu();
    } else {
      output.error("There was an error registering the new user account.");
      return registerUser();
    }
  } catch (err) {
    output.error(err.message);
    return registerUser();
  }
}

async function logOut() {
  user = app.currentUser;
  await user.logOut();
  await index.closeRealm();
  return !user.isLoggedIn;
}

function getAuthedUser() {
  return app.currentUser;
}

exports.getAuthedUser = getAuthedUser;
exports.logIn = logIn;
exports.logOut = logOut;
exports.registerUser = registerUser;
