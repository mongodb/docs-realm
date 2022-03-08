const Realm = require("realm");
const inquirer = require("inquirer");
const users = require("./users");
const schemas = require("./schemas");
const output = require("./output");

const realms = {};

// :code-block-start: openRealm
async function openRealm(partitionKey) {
  const config = {
    schema: [schemas.TaskSchema, schemas.UserSchema, schemas.ProjectSchema],
    sync: {
      user: users.getAuthedUser(),
      partitionValue: partitionKey,
    },
  };
  // :state-start: final
  return Realm.open(config);
  // :state-end: :state-start: start
  // TODO: open a realm with these configuration settings.
  // :state-end:
}
// :code-block-end:

output.intro();

async function run() {
  output.header("*** WELCOME ***");
  output.header(
    "Please log in to your Realm account or register as a new user."
  );

  let choice = await inquirer.prompt([
    {
      type: "rawlist",
      name: "start",
      message: "What do you want to do?",
      choices: ["Log in", "Register as a new user"],
    },
  ]);

  if (choice.start === "Log in") {
    users.logIn();
  } else {
    users.registerUser();
  }
}

run().catch((err) => {
  output.error(err.message);
});

// :code-block-start: getRealm
async function getRealm(partitionKey) {
  if (realms[partitionKey] == undefined) {
    // :state-start: final
    realms[partitionKey] = openRealm(partitionKey);
    // :state-end: :state-start: start
    // TODO: Call the openRealm() function with the partition key parameter.
    // :state-end:
  }
  return realms[partitionKey];
}
// :code-block-end:

async function closeRealm(partitionKey) {
  if (realms[partitionKey] != undefined) {
    realms[partitionKey].close();
    realms[partitionKey] = undefined;
  }
}

exports.getRealm = getRealm;
exports.closeRealm = closeRealm;
exports.run = run;
