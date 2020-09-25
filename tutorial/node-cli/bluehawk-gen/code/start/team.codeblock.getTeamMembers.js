exports.getTeamMembers = async () => {
  const currentUser = users.getAuthedUser();
  try {
    // // TODO: call the getMyTeamMembers() Realm function

    output.result(JSON.stringify(teamMembers, null, 2));
  }
  catch (err) {
    output.error(JSON.stringify(err));
  }
}; 