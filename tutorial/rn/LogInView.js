import React, {useState} from 'react';
import {Button, Text, Input} from 'react-native-elements';
import {useAuth} from './AuthProvider';

// This view has an input for email and password and logs in the user when the
// login button is pressed.
export function LogInView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const {logIn, registerUser} = useAuth();
  const [authMode, setAuthMode] = useState('Login');

  return (
    <>
      <Text h3>{authMode}</Text>
      <Input
        autoCapitalize="none"
        placeholder="email"
        onChangeText={setEmail}
      />
      <Input
        secureTextEntry={true}
        placeholder="password"
        onChangeText={setPassword}
      />
      <Button
        onPress={async () => {
          console.log(`${authMode} button pressed with email ${email}`);
          setError(null);
          try {
            if (authMode === 'Login') {
              await logIn(email, password);
            } else {
              await registerUser(email, password);
              setAuthMode('Login');
            }
          } catch (e) {
            setError(`Operation failed: ${e.message}`);
          }
        }}
        title={authMode}
      />
      <Text>{error}</Text>
      <ToggleAuthModeComponent setAuthMode={setAuthMode} authMode={authMode} />
    </>
  );
}

const ToggleAuthModeComponent = ({authMode, setAuthMode}) => {
  if (authMode === 'Login') {
    return (
      <Button
        title="Haven't created an account yet? Register"
        type="outline"
        onPress={async () => {
          setAuthMode('Register');
        }}
      />
    );
  } else {
    return (
      <Button
        title="Have an account already? Login"
        type="outline"
        onPress={async () => {
          setAuthMode('Login');
        }}
      />
    );
  }
};
