// getTeam calls the backend function getMyTeamMembers to retrieve the
// team members of the logged in user's project
const getTeam = async () => {
  try {
    const teamMembers = await user.functions.getMyTeamMembers([]);
    setTeamMemberList(teamMembers);
  } catch (err) {
    Alert.alert("An error occurred while getting team members", err);
  }
};