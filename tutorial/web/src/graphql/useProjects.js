import { useRealmApp } from "../RealmApp";

// :code-block-start: useProjects
export default function useProjects() {
  const app = useRealmApp();
  if (!app.currentUser) {
    throw new Error("Cannot list projects if there is no logged in user.");
  }
  // :state-start: final
  const projects = app.currentUser.customData.memberOf;
  // :state-end: :state-uncomment-start: start
  // // TODO: Retrieve the current user's projects and assign it to `projects`.
  // const projects;
  // :state-uncomment-end:
  return projects;
}
// :code-block-end:
