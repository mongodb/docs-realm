import React, {useState} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useAuth} from '@realm/react';

import {LoginWithApiKey} from './LoginWithApiKey';
import {LoginWithEmail} from './LoginWithEmail';

export const LogIn = () => {
  const {logIn, logInWithAnonymous, result} = useAuth();

  const loginWithbadAuth = () => {
    logIn('bad auth');
  };

  // Log in with a `Realm.Credentials` instance. This allows login with any
  // authentication mechanism supported by Realm.
  // If this is called when a user is currently logged in, it will switch the user.
  // Typically the other methods from `useAuth` would be used.
  // If this is rendered in the fallback of the `UserProvider`,
  // then it's children will be rendered as soon as this succeeds.
  // useEffect(() => logIn(Realm.Credentials.anonymous()), []);

  return (
    <ScrollView style={[styles.container]}>
      <View style={styles.section}>
        <Text>To get to the rest of the app, you need to log in.</Text>
        <View>
          {result.pending && <ActivityIndicator />}
          {result.error && <ErrorComponent />}
          {result.success && <SuccessComponent />}
        </View>
      </View>

      <View style={styles.section}>
        <Text>Try these log in methods:</Text>
        <View style={styles.buttonGroup}>
          <Button title="Anonymous" onPress={logInWithAnonymous} />
          <LoginWithApiKey />
          <Button title="Bad auth" onPress={loginWithbadAuth} />
        </View>
      </View>

      <LoginWithEmail />
    </ScrollView>
  );
};

function SuccessComponent() {
  return (
    <View>
      <Text>Successfully logged in!</Text>
    </View>
  );
}

function ErrorComponent() {
  return (
    <View>
      <Text>Log in error occured!</Text>
    </View>
  );
}

type ButtonProps = {
  title: string;
  onPress: () => void | null | undefined;
};

const Button = ({title, onPress}: ButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  section: {
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#C5CAE9',
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
    width: '25%',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});
