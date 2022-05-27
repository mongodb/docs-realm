import LoadingSpinner from "./app/components/LoadingSpinner";
import LoginUserScreen from "./app/components/LoginUserScreen";
import App from "./App";
import {appId} from "./realm.json";


const app = new Realm.App({ id: appId });

// :snippet-start: import-task-context
import TaskContext from "./app/models/Task";
const { RealmProvider } = TaskContext;
// :snippet-end:

// :snippet-start: wrap-app-within-realm-provider
function AppWrapper() {
  return (
    <RealmProvider>
      <App />
    </RealmProvider>
  );
}
// :snippet-end:

export default AppWrapper;

// :snippet-start: dynamically-update-realm-config
// :replace-start: {
//   "terms": {
//     "AppWrapper2": "AppWrapper"
//   }
// }
function AppWrapper2() {
  const syncConfig = {
    user: app.currentUser,
    partitionValue: "ExpoTemplate",
  };

  return (
    <RealmProvider sync={syncConfig} fallback={() => <LoadingSpinner />}>
      <App />
    </RealmProvider>
  );
}
// :replace-end:
// :snippet-end: