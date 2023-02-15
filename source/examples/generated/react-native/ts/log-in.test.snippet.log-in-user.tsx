import React from 'react';
import {useApp, UserProvider, AppProvider} from '@realm/react';
import {Button} from 'react-native';

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      {/* Once the user successfully authenticates,
          the app unmounts the component in the
          `UserProvider.fallback` prop (this component).
          The app then renders the children components
          of `UserProvider`. */}
      <UserProvider fallback={LogIn}>
        {/* Components with access to the user.
            These components only render
            if there's an authenticated user.*/}
        <RestOfApp />
      </UserProvider>
    </AppProvider>
  );
}

function LogIn() {
  const app = useApp();

  // This example uses anonymous authentication.
  // However, you can use any authentication provider
  // to log a user in with this pattern.
  async function logInUser() {
    await app.logIn(Realm.Credentials.anonymous());
  }

  return (
    <Button
      title='Log In'
      onPress={logInUser}
    />
  );
}
