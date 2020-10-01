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
    let result = await currentUser.functions.removeTeamMember(selectedTeamMember);
    output.result("The user was removed from your team.");
  } catch (err) {
    output.error(JSON.stringify(err));
  }
};