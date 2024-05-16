import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet, Pressable} from 'react-native';
import {AuthOperationName, useAuth, useEmailPasswordAuth} from '@realm/react';

import {ApiKey} from '../../types';

interface LoginManagerProps {
  apiKey: ApiKey | undefined;
}

export const LoginManager = ({apiKey}: LoginManagerProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {logIn, logOut} = useEmailPasswordAuth();
  const {logInWithApiKey} = useAuth();

  // Log out current user
  useEffect(() => {
    logOut();
  }, []);

  const performLogin = () => {
    logIn({email, password});
  };

  const loginApiKeyUser = () => {
    logInWithApiKey(apiKey!.key);
  };

  return (
    <View>
      {apiKey ? (
        <View>
          <Text>API key found!</Text>
          <Text>
            • {apiKey.name} | {apiKey._id}
          </Text>
          <View style={styles.buttonGroup}>
            <Pressable
              style={styles.button}
              onPress={loginApiKeyUser}>
              <Text style={styles.buttonText}>Log with API key</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View>
          <TextInput
            testID="email-input"
            style={styles.textInput}
            onChangeText={setEmail}
            value={email}
            placeholder="email..."
          />
          <TextInput
            testID="password-input"
            style={styles.textInput}
            onChangeText={setPassword}
            value={password}
            placeholder="password..."
          />
          <View style={styles.buttonGroup}>
            <Pressable
              style={styles.button}
              onPress={performLogin}>
              <Text style={styles.buttonText}>Log in</Text>
            </Pressable>
            <RegisterButton
              email={email}
              password={password}
            />
          </View>
        </View>
      )}
    </View>
  );
};

type RegisterButtonProps = {
  email: string;
  password: string;
};

const RegisterButton = ({email, password}: RegisterButtonProps) => {
  const {register, result, logIn} = useEmailPasswordAuth();

  useEffect(() => {
    if (result.success && result.operation === AuthOperationName.Register) {
      logIn({email, password});
    }
  }, [result, logIn, email, password]);

  const performRegistration = () => {
    console.log('In registration');
    register({email, password});
  };

  return (
    <Pressable
      testID="register-button"
      style={styles.button}
      onPress={performRegistration}>
      <Text style={styles.buttonText}>Register</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
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
