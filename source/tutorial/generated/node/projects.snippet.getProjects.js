async function getProjects() {
  const user = users.getAuthedUser();
  try {
    const { memberOf: projects } = await user.refreshCustomData();

    // Make sure that the user object has been created
    if (!projects) {
      output.error("The user object hasn't been created yet. Try again soon.");
      throw new Error("No projects for user");
    }
    return projects;
  } catch (err) {
    output.error("There was a problem accessing custom user data");
  }
}
