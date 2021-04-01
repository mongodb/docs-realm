const inquirer = require("inquirer");
const Realm = require("realm");
const output = require("./output");
const users = require("./users");

// :code-block-start: getTeamMembers
exports.getTeamMembers = async () => {
  const currentUser = users.getAuthedUser();
  try {
    // :state-start: final
    const teamMembers = await currentUser.functions.getMyTeamMembers();
    // :state-end: :state-uncomment-start: start
    // //TODO: call the getMyTeamMembers() Realm function

    // :state-uncomment-end:
    output.result(JSON.stringify(teamMembers, null, 2));
  } catch (err) {
    output.error(err.message);
  }
};
// :code-block-end:

// :code-block-start: addTeamMember
exports.addTeamMember = async () => {
  try {
    output.header("*** ADD A TEAM MEMBER ***");
    const currentUser = users.getAuthedUser();
    const { email } = await inquirer.prompt([
      {
        type: "input",
        name: "email",
        message: "What is the new team member's email address?",
      },
    ]);
    // :state-start: final
    await currentUser.functions.addTeamMember(email);
    // :state-end: :state-uncomment-start: start
    // //TODO: call the addTeamMember() Realm function

    // :state-uncomment-end:
    output.result("The user was added to your team.");
  } catch (err) {
    output.error(err.message);
  }
};
// :code-block-end:

// :code-block-start: removeTeamMember
exports.removeTeamMember = async () => {
  const currentUser = users.getAuthedUser();
  const teamMembers = await currentUser.functions.getMyTeamMembers();
  const teamMemberNames = teamMembers.map((t) => t.name);
  try {
    output.header("*** REMOVE A TEAM MEMBER ***");
    const { selectedTeamMember } = await inquirer.prompt([
      {
        type: "rawlist",
        name: "selectedTeamMember",
        message: "Which team member do you want to remove?",
        choices: [...teamMemberNames, new inquirer.Separator()],
      },
    ]);
    // :state-start: final
    let result = await currentUser.functions.removeTeamMember(
      selectedTeamMember
    );
    // :state-end: :state-uncomment-start: start
    // //TODO: call the removeTeamMember() Realm function

    // :state-uncomment-end:
    output.result("The user was removed from your team.");
  } catch (err) {
    output.error(err.message);
  }
};
// :code-block-end:
