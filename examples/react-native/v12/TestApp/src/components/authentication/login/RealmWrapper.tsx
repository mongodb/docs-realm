// :snippet-start: configure-user-provider
import React from 'react';
import {AppProvider, UserProvider, useApp} from '@realm/react';

import {LogIn} from './Login';
// :remove-start:
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {APP_ID} from '../../../../appServicesConfig';
import {useUser, useAuth} from '@realm/react';
import {Button} from '../../utility-components/Button';
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
        <UserInformation />
      </UserProvider>
    </AppProvider>
  );
};
// :snippet-end:

// :snippet-start: log-user-out
// :replace-start: {
//    "terms": {
//       "testID=\"log-out\"": ""
//    }
// }
function UserInformation() {
  const user = useUser();
  const {logOut} = useAuth();
  const performLogout = () => {
    logOut();
  };
  // :remove-start:
  const app = useApp();
  // Deletes the user, but @realm/react doesn't currently
  // refrender or fall back to the fallback component.
  const deleteUser = async () => {
    // Type hack because @realm/react's User type doesn't quite match
    // Realm's User type.
    app.deleteUser(user as unknown as Realm.User);
  };
  // :remove-end:

  if (user) {
    return (
      <View>
        <Text>User state: {user.state}</Text>
        {user.profile.email && <Text>Email: {user.profile.email}</Text>}
        <FlatList
          testID="list-container" // :remove:
          data={user.identities}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <UserIdentity id={item.id} providerType={item.providerType} />
          )}
        />

        <Button testID="log-out" title="Log out" onPress={performLogout} />
        {/* :remove-start: */}
        <Button testID="delete-user" title="Delete user" onPress={deleteUser} />
        {/* :remove-end: */}
      </View>
    );
  } else {
    return <Text>No user logged in</Text>;
  }
}
// :replace-end:
// :snippet-end:

const UserIdentity = ({
  id,
  providerType,
}: {
  id: string;
  providerType: string;
}) => {
  return (
    <View testID="user-identity" style={styles.identity}>
      <Text testID="user-id">ID: {id}</Text>
      {providerType && (
        <Text testID="user-provider">Provider type: {providerType}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  identity: {
    marginVertical: 12,
    marginHorizontal: 8,
  },
});
