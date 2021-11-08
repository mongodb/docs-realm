function setProjectsFromChange(change, setProjects){
  const { fullDocument: { memberOf } } = change;
  setProjects(memberOf);
}

export default function useProjects() {
  const app = useRealmApp();
  const [projects, setProjects] = React.useState(app.currentUser.customData.memberOf);
  if (!app.currentUser) {
    throw new Error("Cannot list projects if there is no logged in user.");
  }
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const users = mongodb.db("tracker").collection("User");

  React.useEffect(() => { 
    (async () => {
      for await (const change of users.watch()) {
        setProjectsFromChange(change, setProjects);
      }
    })();
  });
  return projects;
}
