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