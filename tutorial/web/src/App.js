import React from "react";
import LoginScreen from "./components/LoginScreen";
import TaskApp from "./TaskApp";
import RealmApolloProvider from "./graphql/RealmApolloProvider";
import { useRealmApp, RealmAppProvider } from "./RealmApp";

// :code-block-start: appID
export const APP_ID = "tasktracker-huhcb";
// :code-block-end:

// :code-block-start: requireLoggedInUser
const RequireLoggedInUser = ({ children }) => {
  // Only render children if there is a logged in user.
  const app = useRealmApp();
  return app.currentUser ? children : <LoginScreen />;
};
// :code-block-end:

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
