import {
  AppProvider,
  UserProvider,
  RealmProvider,
  useUser,
} from "@realm/react";
import { LoginPage } from "./pages/LoginPage";
import { TodoPage } from "./pages/TodoPage";

import { APP_ID } from "./appServicesConfig";
import "./App.css";
import { Item } from "./models";

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <div className="app-header">
        <p>@realm/react Test App</p>
      </div>
      <div className="app">
        <UserProvider fallback={LoginPage}>
          <App />
        </UserProvider>
      </div>
    </AppProvider>
  );
}

const App = () => {
  const user = useUser();

  return (
    <div>
      <RealmProvider
        schema={[Item]}
        sync={{
          flexible: true,
          user: user,
          initialSubscriptions: {
            update(subs, realm) {
              subs.add(realm.objects(Item));
            },
          },
        }}
      >
        <UserDetail />
        <TodoPage />
      </RealmProvider>
    </div>
  );
};

const UserDetail = () => {
  const user = useUser();

  return (
    <div>
      <p>Account id: {user.id}</p>
      {user.profile.email && <p>Email: {user.profile.email}</p>}
    </div>
  );
};

export default AppWrapper;
