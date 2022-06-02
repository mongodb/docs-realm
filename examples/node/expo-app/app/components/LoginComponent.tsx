import React from 'react';
import Realm from 'realm';
import {useApp} from '@realm/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, View, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';

function LoginComponent({}) {
  const email = 'email@email.com';
  const password = 'Email123!';

  const app = useApp();

  // signIn() uses the emailPassword authentication provider to log in
  const signIn = async () => {
    const creds = Realm.Credentials.emailPassword(email, password);
    await app.logIn(creds);
  };

  // onPressSignIn() uses the emailPassword authentication provider to log in
  const onPressSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error.message}`);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.viewWrapper}>
        <Input autoCapitalize="none" defaultValue={email} />
        <Input placeholder={password} defaultValue="Email123!" />
        <Button
          title="Log In"
          buttonStyle={styles.mainButton}
          onPress={onPressSignIn}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
  },
  mainButton: {
    width: 350,
  },
});

export default LoginComponent;
