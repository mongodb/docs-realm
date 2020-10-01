import { useRealmApp } from "../RealmApp";

// :code-block-start: useProjects
export default function useProjects() {
  const app = useRealmApp();
  if (!app.currentUser) {
    throw new Error("Cannot list projects if there is no logged in user.");
  }
  // :hide-start: 
  const projects = app.currentUser.customData.memberOf;
  // :replace-with: 
  // // TODO: Retrieve the current user's projects and assign it to `projects`. 
  // const projects;
  // :hide-end:
  return projects;
}
// :code-block-end: