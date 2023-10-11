// :snippet-start: imports
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import {Credentials} from 'realm';
import {
  AppProvider,
  UserProvider,
  useUser,
  useAuth,
  useEmailPasswordAuth,
  AuthOperationName,
  useApp,
} from '@realm/react';

// A custom wrapper around <Pressable> for styling
import {Button} from '../../utility-components/Button';
// :snippet-end:
import {APP_ID} from '../../../../appServicesConfig'; // :remove:

// :snippet-start: providers
export const LinkIdentities = () => {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RegisterUser />
      </UserProvider>
    </AppProvider>
  );
};

// Log in an anonymous user when the app opens.
// This component only mounts if there is no
// authenticated user.
const LogIn = () => {
  const {logInWithAnonymous} = useAuth();

  return (
    <View>
      <Text>No one is logged in yet.</Text>
      <Button testID="log-in" title="Log in" onPress={logInWithAnonymous} />
    </View>
  );
};
// :snippet-end:

// :snippet-start: user-identities
type UserIdentity = {
  providerType: string;
  id: string;
};

// Convert an anonymous user to an email/password account.
// For this example, the App Services backend automatically
// confirms users' emails.
const RegisterUser = () => {
  const app = useApp();
  const user = useUser();
  const {logOut} = useAuth();
  const {register, result} = useEmailPasswordAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userIdentities, setUserIdentities] = useState(user.identities);
  // :remove-start:
  // This useEffect is for test purposes only. If the current
  // user has more than 1 identity, then log them out. We need
  // an unlinked user for this test. Only runs once when the
  // component is first mounted.
  useEffect(() => {
    if (userIdentities.length > 1) {
      logOut();
    }
  }, []);
  // :remove-end:

  useEffect(() => {
    if (result.operation === AuthOperationName.Register && result.success) {
      linkCredentials();
    }
  }, [result]);

  if (!userIdentities.length) {
    setUserIdentities(user.identities);
  }

  const linkCredentials = async () => {
    const credentials = Credentials.emailPassword(email, password);
    await user.linkCredentials(credentials);

    setUserIdentities(user.identities);
  };

  const registerAndLinkIdentities = async () => {
    register({email, password});
  };

  const deleteUser = async () => {
    app.deleteUser(app.currentUser!);
  };
  // :replace-start: {
  //    "terms": {
  //       "style={styles.section": "",
  //       "style={styles.inputGroup": "",
  //       "style={styles.buttonGroup}": "",
  //       "testID=\"user-identity\"": ""
  //    }
  // }
  return (
    <View style={styles.section}>
      {/* Show all identities associated with the current user */}
      <FlatList
        testID="list-container" // :remove:
        data={userIdentities}
        renderItem={({item}) => (
          <Text testID="user-identity">ID: {item.id}</Text>
        )}
        keyExtractor={item => item.id}
      />

      <Text>Link anonymous user with email/password account</Text>
      <View style={styles.inputGroup}>
        <TextInput
          testID="email-input" // :remove:
          style={styles.textInput} // :remove:
          onChangeText={setEmail}
          value={email}
          placeholder="email..."
        />
        <TextInput
          testID="password-input" // :remove:
          style={styles.textInput} // :remove:
          onChangeText={setPassword}
          value={password}
          placeholder="password..."
        />
      </View>

      <View style={styles.buttonGroup}>
        <Button
          testID="register-and-link" // :remove:
          title="Register"
          onPress={registerAndLinkIdentities}
        />
        <Button
          testID="log-out" // :remove:
          title="Log out"
          onPress={logOut}
        />
        <Button
          testID="delete-user" // :remove:
          title="Delete user"
          onPress={deleteUser}
        />
      </View>
    </View>
  );
  // :replace-end:
};
// :snippet-end:

const styles = StyleSheet.create({
  section: {
    flex: 1,
    marginTop: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#C5CAE9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 5,
  },
  inputGroup: {
    width: '100%',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
