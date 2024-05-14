import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';
import {
  AppProvider,
  AuthOperationName,
  UserProvider,
  useEmailPasswordAuth,
  useUser,
  useApp,
  useAuth,
} from '@realm/react';

import {APP_ID} from '../../../../appServicesConfig';

export const ApiKeyAuth = () => {
  const [apiKeyKey, setApiKeyKey] = useState('');
  const testUser = {
    email: 'test-rn-api-key@example.com',
    password: 'abc123',
  };

  return (
    <AppProvider id={APP_ID}>
      <InitialLogin
        email={testUser.email}
        password={testUser.password}
      />
      <UserProvider>
        <ManageApiKeys setApiKeyKey={setApiKeyKey} />
        <ApiKeyLogin apiKey={apiKeyKey} />
        <DoAppThings />
      </UserProvider>
    </AppProvider>
  );
};

interface userInfo {
  email: string;
  password: string;
}

// You can only create API keys for a user who has already
// logged in. Perform initial login with another auth type.
const InitialLogin = ({email, password}: userInfo) => {
  const {logOut, result, logIn} = useEmailPasswordAuth();

  // Log in the user after successful registration
  useEffect(() => {
    if (result.success && result.operation === AuthOperationName.Register) {
      logIn({email: email, password: password});
    }
  }, [result, logIn, email, password]);

  // const performRegistration = () => {
  //   register({email: userInputs.email, password: userInputs.password});
  // };

  const loginEmailPasswordUser = () => {
    logIn({email: email, password: password});
  };

  return (
    <View>
      <Text>
        First, log out existing user and log in with email and password
      </Text>
      <Button
        onPress={logOut}
        title="Logout Existing User"
      />
      <Button
        onPress={loginEmailPasswordUser}
        title="Log in email/password user"
      />
    </View>
  );
};

interface ManageApiKeysProps {
  setApiKeyKey: React.Dispatch<React.SetStateAction<string>>;
}

const ManageApiKeys = ({setApiKeyKey}: ManageApiKeysProps) => {
  const user = useUser();

  const [apiKeyId, setApiKeyId] = useState('');

  async function createUserApiKey() {
    const {_id, key, name, disabled} =
      await user?.apiKeys.create('mySecretKey');

    // ...Do something with API key like save it
    // or share it with external service that authenticates
    // on user's behalf.
    // :remove-start:
    setApiKeyId(_id);
    setApiKeyKey(key);
    // :remove-end:
  }

  async function fetchUserApiKey() {
    // List all of a user's keys
    const keys = await user.apiKeys.fetchAll();
    // Get a specific key by its ID
    const key = await user.apiKeys.fetch(apiKeyId);
  }

  async function disableUserApiKey() {
    // Get the user's API key
    const keys = await user.apiKeys.fetchAll();
    const keyId = keys[0]['_id'];

    // Enable the User API Key
    await user.apiKeys.disable(keyId);
  }

  async function enableUserApiKey() {
    // Get the user's API key
    const keys = await user.apiKeys.fetchAll();
    const keyId = keys[0]['_id'];

    // Enable the User API Key
    await user.apiKeys.enable(keyId);
  }

  async function deleteUserApiKey() {
    // Get the user's API key
    const keys = await user.apiKeys.fetchAll();
    const keyId = keys[0]['_id'];

    // Enable the User API Key
    await user.apiKeys.delete(keyId);
  }

  // :remove-start:
  return (
    <View style={styles.section}>
      <Text>Logged-in user ID is: {user.id}</Text>
      <Text>User's state is {user.state}</Text>
      <View style={styles.buttonGroup}>
        <Button
          onPress={createUserApiKey}
          title="Create API Key"
        />
        <Button
          onPress={fetchUserApiKey}
          title="Fetch API Keys"
        />
        <Button
          onPress={disableUserApiKey}
          title="Disable API Key"
        />
        <Button
          onPress={enableUserApiKey}
          title="Enable API Key"
        />
        <Button
          onPress={deleteUserApiKey}
          title="Delete API Key"
        />
      </View>
    </View>
  );
  // :remove-end:
};

const ApiKeyLogin = ({apiKey}: {apiKey: string}) => {
  const {result, logInWithApiKey} = useAuth();

  const performLogin = () => {
    let apiKeyCredential = logInWithApiKey(apiKey);
  };

  return (
    <View>
      <Text>The API Key isn't logged in yet.</Text>
      <Button
        onPress={performLogin}
        title="Log in with API Key"
      />
    </View>
  );
};

function DoAppThings() {
  const app = useApp();
  // Proceed to app logic...
  // :remove-start:
  return (
    <Text testID="logged-in-user-id">
      "Logged in as user with ID: {app.currentUser?.id}"
    </Text>
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
