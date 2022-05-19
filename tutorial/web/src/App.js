import React from "react";
import LoginScreen from "./components/LoginScreen";
import TaskApp from "./TaskApp";
import RealmApolloProvider from "./graphql/RealmApolloProvider";
import { useRealmApp, RealmAppProvider } from "./RealmApp";

// :snippet-start: appID
// :replace-start: {
//   "terms": {
//     "tasktracker-qczfq": "<your Realm app ID here>"
//   }
// }
export const APP_ID = "tasktracker-qczfq";
// :replace-end:
// :snippet-end:

// :snippet-start: requireLoggedInUser
const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const app = useRealmApp();
  return app.currentUser ? children : <LoginScreen />;
};
// :snippet-end:

export default function App() {
  return (
    <RealmAppProvider appId={APP_ID}>
      <RequireLoggedInUser>
        <RealmApolloProvider>
          <TaskApp />
        </RealmApolloProvider>
      </RequireLoggedInUser>
    </RealmAppProvider>
  );
}
