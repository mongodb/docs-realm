import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useEmailPasswordAuth, AuthOperationName} from '@realm/react';

import {Button} from '../../utility-components/Button';

// TODO: look at realm.js test `credentials/email-password.ts` for
// guidance on testing confirmation emails and stuff.

export const LoginWithEmail = () => {
  // :snippet-start: email-password-login
  const {logIn} = useEmailPasswordAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const performLogin = () => {
    logIn({email, password});
  };
  // :snippet-end:

  return (
    <View style={styles.section}>
      <Text>Log in with email and password</Text>

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
        <Button testID="log-in" title="Log in" onPress={performLogin} />
        <RegisterButton email={email} password={password} />
        <ResetPasswordButton email={email} />
      </View>
    </View>
  );
};

// :snippet-start: email-password-register
type RegisterButtonProps = {
  email: string;
  password: string;
};

const RegisterButton = ({email, password}: RegisterButtonProps) => {
  const {register} = useEmailPasswordAuth();

  // For this example, the App Services backend automatically
  // confirms users' emails.
  const performRegistration = () => {
    register({email, password});
  };

  return (
    <Button
      testID="register-button" // :remove:
      title="Register"
      onPress={performRegistration}
    />
  );
};
// :snippet-end:

interface Error {
  name: string;
  message: string;
  stack?: string;
}

const ResetPasswordButton = ({email}: {email: string}) => {
  const {sendResetPasswordEmail, result} = useEmailPasswordAuth();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (
      result.operation === AuthOperationName.SendResetPasswordEmail &&
      result.error
    ) {
      setErrorMessage(result.error.message);
    }
  }, [result]);

  const performPasswordReset = () => {
    sendResetPasswordEmail({email: email});
  };

  return (
    <View>
      <Button
        testID="reset-password" // :remove:
        title="Reset password"
        onPress={performPasswordReset}
      />
      {/* We expect an error because password resets through
      email is disabled in this app's configuration. */}
      {errorMessage && <Text>Error: {errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    flex: 1,
    borderTopWidth: StyleSheet.hairlineWidth,
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
