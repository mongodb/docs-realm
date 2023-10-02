// :snippet-start: configure-user-provider
import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';

import {LogIn} from './Login';
// :remove-start:
import {View, Text, Button} from 'react-native';
import {APP_ID} from '../../../../appServicesConfig';
import {useUser, useAuth} from '@realm/react';
// :remove-end:

export const LoginExample = () => {
  return (
    <AppProvider id={APP_ID}>
      {/* If there is no authenticated user,
          mount the `fallback` component.
          When user successfully authenticates,
          the app unmounts the `fallback` component
          (in this case, th `LogIn` component). */}
      <UserProvider fallback={LogIn}>
        {/* Components inside UserProvider have access
            to the user.
            These components only mount if there's an
            authenticated user. */}
        <RestOfApp />
      </UserProvider>
    </AppProvider>
  );
};
// :snippet-end:

// :snippet-start: log-user-out
function RestOfApp() {
  const user = useUser();
  const {logOut} = useAuth();

  if (user) {
    return (
      <View>
        {user.profile.email && <Text>Email: {user.profile.email}</Text>}
        <Text>ID: {user.id}</Text>

        <Button title="Log out" onPress={logOut} />
      </View>
    );
  } else {
    return <Text>No user logged in</Text>;
  }
}
// :snippet-end:
