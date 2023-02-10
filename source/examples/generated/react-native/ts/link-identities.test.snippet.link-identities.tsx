import React from 'react';
import {AppProvider, UserProvider, useApp, useUser} from '@realm/react';
import Realm from 'realm';
import {View, Button, Text, TextInput} from 'react-native';

function AppWrapper() {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <UserProvider fallback={<AnonymousLogIn />}>
          {/* ...Rest of app */}
          <LinkUserIdentities />
        </UserProvider>
      </AppProvider>
    </View>
  );
}

// Log in an anonymous user when the app opens
// if not already logged in current user.
function AnonymousLogIn() {
  const app = useApp();

  React.useEffect(() => {
    app.logIn(Realm.Credentials.anonymous());
  }, []);
  return null;
}

// Link user credentials. The component contains a form whe
function LinkUserIdentities() {
  const user = useUser();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Link email/password credentials to logged in
  const linkIdentities = async () => {
    const credentials = Realm.Credentials.emailPassword(email, password);
    await user.linkCredentials(credentials);
  };

  return (
    <View>
      <Text>Log In User</Text>
      <View>
        <Text>Email Address:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button
        onPress={linkIdentities}
        title='Link Credentials'
      />
    </View>
  );
}

