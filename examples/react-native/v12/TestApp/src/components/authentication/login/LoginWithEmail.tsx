import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useEmailPasswordAuth} from '@realm/react';

import {Button} from '../../utility-components/Button';

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
          style={styles.textInput}
          onChangeText={setEmail}
          value={email}
          placeholder="email..."
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          value={password}
          placeholder="password..."
        />
      </View>

      <View style={styles.buttonGroup}>
        <Button title="Log in" onPress={performLogin} />
        <RegisterButton email={email} password={password} />
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

  const performRegistration = () => {
    register({email, password});
  };

  return <Button title="Register" onPress={performRegistration} />;
};
// :snippet-end:

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
