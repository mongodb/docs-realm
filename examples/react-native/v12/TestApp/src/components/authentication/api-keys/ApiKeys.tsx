import React, { useEffect } from 'react';
import {AppProvider, AuthOperationName, UserProvider, useEmailPasswordAuth, useUser} from '@realm/react';
import {useApp} from '@realm/react';
import {useAuth} from '@realm/react';
import {Text, View, Pressable, StyleSheet, Button, FlatList} from 'react-native';
import {APP_ID} from '../../../../appServicesConfig';
import { Credentials } from 'realm';

const userInputs = {
  email: 'test-rn-api-key@example.com',
  password: 'abc123',
};
const credentials = Credentials.emailPassword(userInputs.email, userInputs.password);

export const ApiKeyAuth = () => {
    return (
      <AppProvider id={APP_ID}>
        <InitialLogIn />
          <UserProvider>
            <ManageAPIKeys />
            <APIKeyLogIn />
              <DoAppThings />
          </UserProvider>
      </AppProvider>
    );
};

let userApiKey: Realm.Auth.ApiKey;
let apiKeyKey = "";

// You can only create API keys for a user who has already
// logged in. Perform initial login with another auth type.
const InitialLogIn = () => {
  const {logOut, result, logIn} = useEmailPasswordAuth();

  // Log in the user after successful registration
  useEffect(() => {
    if (result.success && result.operation === AuthOperationName.Register) {
      logIn({email: userInputs.email, password: userInputs.password});
    }
  }, [result, logIn, userInputs.email, userInputs.password]);

  // const performRegistration = () => {
  //   register({email: userInputs.email, password: userInputs.password});
  // };

  const loginEmailPasswordUser = () => {
    logIn({email: userInputs.email, password: userInputs.password});
  };

  return (
    <View>
      <Text>First, log out existing user and log in with email and password</Text>
      <Button onPress={logOut} title='Logout Existing User' />
      <Button onPress={loginEmailPasswordUser} title='Log in email/password user' />
    </View>
  );
};

const ManageAPIKeys = () => {
  const user = useUser();

  async function createUserAPIKey() {
    const apiKey = await user?.apiKeys.create('mySecretKey');
    // ...Do something with API key like save it
    // or share it with external service that authenticates
    // on user's behalf.
    // :remove-start:
    userApiKey = apiKey!;
    apiKeyKey = apiKey.key;
    // :remove-end:
  }

  async function fetchUserAPIKey() {
    // List all of a user's keys
    const keys = await user.apiKeys.fetchAll();
    // Get a specific key by its ID
    const key = await user.apiKeys.fetch(userApiKey._id);
  }

  async function disableUserAPIKey() {
    // Get the user's API key
    const keys = await user.apiKeys.fetchAll();
    const keyId = keys[0]["_id"];

    // Enable the User API Key
    await user.apiKeys.disable(keyId);
  }

  async function enableUserAPIKey() {
    // Get the user's API key
    const keys = await user.apiKeys.fetchAll();
    const keyId = keys[0]["_id"];

    // Enable the User API Key
    await user.apiKeys.enable(keyId);
  }

  async function deleteUserAPIKey() {
    // Get the user's API key
    const keys = await user.apiKeys.fetchAll();
    const keyId = keys[0]["_id"];

    // Enable the User API Key
    await user.apiKeys.delete(keyId);
  }

  // :remove-start:
  return (
    <View style={styles.section}>
      <Text>Logged-in user ID is: {user.id}</Text>
      <Text>User's state is {user.state}</Text>
      <View style={styles.buttonGroup}>
        <Button onPress={createUserAPIKey} title='Create API Key' />
        <Button onPress={fetchUserAPIKey} title='Fetch API Keys' />
        <Button onPress={disableUserAPIKey} title='Disable API Key' />
        <Button onPress={enableUserAPIKey} title='Enable API Key' />
        <Button onPress={deleteUserAPIKey} title='Delete API Key' />
      </View>
    </View>
  );
  // :remove-end:
};

const APIKeyLogIn = () => {
  const {logIn, result} = useAuth();

  const performLogin = () => {
    let apiKeyCredential = Realm.Credentials.apiKey(apiKeyKey);
    logIn(apiKeyCredential);
  };
  
  return (
    <View>
      <Text>The API Key isn't logged in yet.</Text>
      <Button onPress={performLogin} title='Log in with API Key' />
    </View>
  );
};

function DoAppThings() {
    const app = useApp();
    // Proceed to app logic...
    // :remove-start:
    return (
      <Text testID="logged-in-user-id">"Logged in as user with ID: {app.currentUser?.id}"</Text>
    );
    // :remove-end:
  }

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
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginVertical: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3F51B5',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 5,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

// beforeAll(async () => {
//   // fails if user already exits
//   try {
//     await App.get(APP_ID).emailPasswordAuth.registerUser(userInputs);
//   } catch (err) {
//     console.log(err);
//   }
// });
// afterAll(async () => {
//   const app = App.get(APP_ID);
//   const user = await app.logIn(credentials);
//   await app.deleteUser(user);
// });
