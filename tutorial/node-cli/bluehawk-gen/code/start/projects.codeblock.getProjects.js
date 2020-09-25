async function getProjects() { 
  const realm = await index.getRealm(`user=${users.getAuthedUser().id}`);
  const currentUser = users.getAuthedUser().id;
  // // TODO: Call the objectForPrimaryKey() method to get the current user and assign
  // // the memberOf property of the user to projects. 
  // const user;
  // const projects;
  return projects;
};