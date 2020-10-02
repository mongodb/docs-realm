const inquirer = require("inquirer");
const Realm = require("realm");
const output = require("./output");
const users = require("./users");


exports.getTeamMembers = async () => {
  const currentUser = users.getAuthedUser();
  try {
    const teamMembers = await currentUser.functions.getMyTeamMembers();
    output.result(JSON.stringify(teamMembers, null, 2));
  }
  catch (err) {
    output.error(JSON.stringify(err));
  }
};  

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
    await currentUser.functions.addTeamMember(email);
    output.result("The user was added to your team.");
  } catch (err) {
    output.error(err.message);
  }
};

exports.removeTeamMember = async () => {
  const currentUser = users.getAuthedUser();
  const teamMembers = await currentUser.functions.getMyTeamMembers();
  const teamMemberNames = teamMembers.map(t => t.name);
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
    let result = await currentUser.functions(selectedTeamMember);
    output.result("The user was removed from your team.");
  } catch (err) {
    output.error(JSON.stringify(err));
  }
};
