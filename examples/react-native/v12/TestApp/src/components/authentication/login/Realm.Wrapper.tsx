import React from 'react';
import {View, Text, Button} from 'react-native';
import {useApp, UserProvider, AppProvider, useAuth} from '@realm/react';

import {LogIn} from './Login';

import {APP_ID} from '../../../../appServicesConfig';

export const LoginExample = () => {
  return (
    <AppProvider id={APP_ID}>
      {/* If there is no authenticated user,
          the app mounts the `fallback` component.
          Once the user successfully authenticates,
          the app unmounts the component in the
          `UserProvider.fallback` prop
          (the `LogIn` component in this example). */}
      <UserProvider fallback={LogIn}>
        {/* Components with access to the user.
            These components only mount
            if there's an authenticated user.*/}
        <RestOfApp />
      </UserProvider>
    </AppProvider>
  );
};

function RestOfApp() {
  const app = useApp();
  const {logOut} = useAuth();
  const currentUser = JSON.stringify(app.currentUser, null, 2);

  return (
    <View>
      <Text>Logged in? {app.currentUser ? 'yes' : 'no'}</Text>
      <Text>User ID: {app.currentUser?.id}</Text>
      <Button title="Log out" onPress={logOut} />
    </View>
  );
}
