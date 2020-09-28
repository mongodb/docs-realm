import { useRealmApp } from "../RealmApp";

export default function useProjects() {
  const app = useRealmApp();
  if (!app.currentUser) {
    throw new Error("Cannot list projects if there is no logged in user.");
  }
  const projects = app.currentUser.customData.memberOf;
  return projects;
}
