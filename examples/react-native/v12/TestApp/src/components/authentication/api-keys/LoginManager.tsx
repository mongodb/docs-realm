import React, {useEffect} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {useEmailPasswordAuth, useAuth, useApp} from '@realm/react';

interface LoginManagerProps {
  email: string;
  password: string;
  apiKey: string;
}

// You can only create API keys for a user who has already
// logged in. Perform initial login with another auth type.
export const LoginManager = ({email, password, apiKey}: LoginManagerProps) => {
  const {logOut, result, logIn} = useEmailPasswordAuth();
  const {logInWithApiKey} = useAuth();
  const app = useApp();

  useEffect(() => {
    if (app.currentUser) {
      app.currentUser.logOut();
    }
  }, []);

  // For test purposes only. Indicates when login results change.
  useEffect(() => {
    console.log('InitialLogin operation: ', result.operation);
    console.log('InitialLogin state: ', result.state);
    console.log('InitialLogin result: ', result.success);
  }, [result]);

  const loginEmailPasswordUser = () => {
    if (!app.currentUser) {
      logIn({email: email, password: password});
    }
  };
  const loginApiKeyUser = () => {
    let apiKeyCredential = logInWithApiKey(apiKey);
  };

  return (
    <View style={styles.section}>
      <Text>
        First, log out existing user and log in with email and password
      </Text>
      <View style={styles.buttonGroup}>
        <Pressable
          style={styles.button}
          onPress={logOut}>
          <Text style={styles.buttonText}>Log out</Text>
        </Pressable>
        <Pressable
          style={!app.currentUser ? styles.button : styles.disabledButton}
          onPress={loginEmailPasswordUser}>
          <Text style={styles.buttonText}>Log in email/password user</Text>
        </Pressable>

        <Pressable
          style={apiKey ? styles.button : styles.disabledButton}
          onPress={loginApiKeyUser}
          disabled={!apiKey}>
          <Text style={styles.buttonText}>Log in with API Key</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    marginTop: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
    paddingVertical: 8,
    justifyContent: 'center',
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
  disabledButton: {
    backgroundColor: '#F3A6C2',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ffffff',
    opacity: 0.5,
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
