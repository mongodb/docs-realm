async function getProjects() { 
  const realm = await index.getRealm(`user=${users.getAuthedUser().id}`);
  const currentUser = users.getAuthedUser().id;
  const user = realm.objectForPrimaryKey("User", currentUser);
  const projects = user.memberOf;
  return projects;
};