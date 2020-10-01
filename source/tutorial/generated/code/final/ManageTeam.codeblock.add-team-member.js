// addTeamMember calls the backend function addTeamMember to add a
// team member to the logged in user's project
const addTeamMember = async () => {
  try {
    await user.functions.addTeamMember(newTeamMember);
    getTeam();
  } catch (err) {
    Alert.alert("An error occurred while adding a team member", err.message);
  }
};