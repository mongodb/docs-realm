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