// import { useState } from "react";
// import * as Realm from "realm-web";
import { AppProvider, useAuth, UserProvider, useUser } from "@realm/react";

import { APP_ID } from "./appServicesConfig";

import "./App.css";

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <div className="App">
        <UserProvider fallback={Login}>
          <App />
        </UserProvider>
      </div>
    </AppProvider>
  );
}

const App = () => {
  return (
    <div>
      <div className="App-header">
        <UserDetail />
      </div>
    </div>
  );
};

const UserDetail = () => {
  const user = useUser();

  return (
    <div>
      <h1>Logged in with anonymous id: {user.id}</h1>
    </div>
  );
};

const Login = () => {
  const { logInWithAnonymous } = useAuth();

  const loginAnonymous = async () => {
    logInWithAnonymous();
  };
  return <button onClick={loginAnonymous}>Log In</button>;
};

export default AppWrapper;
