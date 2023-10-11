import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {AuthError, useAuth} from '@realm/react';

import {LoginWithEmail} from './LoginWithEmail';
import {LogInWithAnonymous} from './LoginWithAnonymous';
import {Button} from '../../utility-components/Button';

export const LogIn = () => {
  const {logIn, result} = useAuth();

  const loginWithbadAuth = () => {
    logIn('bad auth');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        {!result.error && (
          <Text>To get to the rest of the app, you need to log in.</Text>
        )}
        <View>
          {result.pending && <ActivityIndicator />}
          {result.error && <ErrorComponent error={result.error} />}
          {result.success && <SuccessComponent />}
        </View>
      </View>

      <View style={styles.section}>
        <Text>Try these log in methods</Text>
        <View style={styles.buttonGroup}>
          <LogInWithAnonymous />
          {/* The following login options will be added
              In future PRs. */}
          {/* <LoginWithApiKey /> */}
          {/* <LoginWithJwt /> */}
          {/* <LoginWithFunction /> */}
          {/* <LoginOffline /> */}
          {/* <LoginWithGoogle /> */}
          {/* <LoginWithFacebook /> */}
          {/* <LoginWithApple /> */}
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
      <Text testID="result-success-message">Successful auth operation!</Text>
    </View>
  );
}

function ErrorComponent({error}: {error: AuthError}) {
  return (
    <View>
      <Text>{error.name}</Text>
      <Text>{error.message}</Text>
    </View>
  );
}

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
