import { useEffect } from "react";
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

const logIn = async () => await app.logIn(Realm.Credentials.anonymous());

// :snippet-start: dynamically-update-realm-config
// :replace-start: {
//   "terms": {
//     "AppWrapper2": "AppWrapper"
//   }
// }
function AppWrapper2() {
  // :remove-start:
  useEffect(() => {
    logIn();
  })
  // :remove-end:
  const syncConfig = {
    user: app?.currentUser,
    partitionValue: "ExpoTemplate",
  };
  
  // :uncomment-start:
  // return (
  //   <RealmProvider sync={syncConfig} fallback={() => <LoadingSpinner />}>
  //     <App />
  //   </RealmProvider>
  // );
  // :uncomment-end: 
  // :remove-start:
  return (
    <RealmProvider sync={syncConfig} deleteRealmIfMigrationNeeded={false} fallback={() => <LoadingSpinner />}>
      <App />
    </RealmProvider>
  );
  // :remove-end:
}
// :replace-end:
// :snippet-end:

export default AppWrapper;