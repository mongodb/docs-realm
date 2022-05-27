import { Task } from "./app/models/Task";

import App from "./App";


// :snippet-start: import-task-context
import TaskContext from "./app/models/Task";
const { RealmProvider } = TaskContext;
// :snippet-end:

// :snippet-start: wrap-app-within-realm-provider
function AppWrapper() {
  // if (!app.currentUser) {
  //   return <LoginUserScreen />;
  // }
  return (
    <RealmProvider>
      <App />
    </RealmProvider>
  );
}
// :snippet-end:

export default AppWrapper;