import { useRealmApp } from "../RealmApp";
import React from 'react';

// :code-block-start: useProjects
// :state-start: final
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

  React.useEffect( () => { 
    (async () => {
      for await (const change of users.watch()) {
        switch (change.operationType) {
          case "insert": {
            setProjectsFromChange(change, setProjects);
            break;
          }
          case "update": {
            setProjectsFromChange(change, setProjects);
            break;
          }
          case "replace": {
            setProjectsFromChange(change, setProjects);
            break;
          }
          case "delete": {
            setProjectsFromChange(change, setProjects);
            break;
          }
          default: {
            break;
          }
        }
      }
    })()
  });
  // :state-end: 
  // :state-uncomment-start: start
  // // TODO: Retrieve the current user's projects and assign it to `projects`.
  // const projects;
  // :state-uncomment-end:
  return projects;
}
// :code-block-end:
