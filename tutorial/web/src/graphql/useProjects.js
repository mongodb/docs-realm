import { useRealmApp } from "../RealmApp";
import React from "react";

// :code-block-start: useProjects
// :state-start: final
function setProjectsFromChange(change, setProjects) {
  const {
    fullDocument: { memberOf },
  } = change;
  setProjects(memberOf);
}

export default function useProjects() {
  const app = useRealmApp();
  const [projects, setProjects] = React.useState(
    app.currentUser.customData.memberOf
  );
  if (!app.currentUser) {
    throw new Error("Cannot list projects if there is no logged in user.");
  }
  const mongodb = app.currentUser.mongoClient("mongodb-atlas");
  const users = mongodb.db("tracker").collection("User");

  // set asynchronous event watcher to react to any changes in the users collection
  React.useEffect(() => {
    let changeWatcher;
    (async () => {
      changeWatcher = users.watch();
      for await (const change of changeWatcher) {
        setProjectsFromChange(change, setProjects);
      }
    })();

    // close connection when component unmounts
    return () => changeWatcher.return();
  });

  return projects;
}
// :state-end:
// :state-uncomment-start: start
// // TODO: Retrieve the current user's projects and assign it to `projects`
// // with refresh when their project list is updated.
// :state-uncomment-end:
// :code-block-end:
