// removeTeamMember calls the backend function removeTeamMember to remove a
// team member from the logged in user's project
const removeTeamMember = async (email) => {
  try {
    await user.functions.removeTeamMember(email);
    getTeam();
  } catch (err) {
    Alert.alert("An error occurred while removing a team member", err);
  }
};