import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import {useApp} from '@realm/react';
import {useAuth} from '@realm/react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {APP_ID} from '../../../appServicesConfig';

export const AppWithAuthHook = () => {
  // use setstate to change base url variable here?
  return (
    <View>
      <AppProvider id={APP_ID}>
        <UserProvider fallback={LogIn}>
          <MyApp />
        </UserProvider>
      </AppProvider>
    </View>
  );
};

const LogIn = () => {
  const {logInWithAnonymous} = useAuth();

  return (
    <View>
      <Text>No one is logged in yet.</Text>
      <Pressable
        testID="log-in"
        style={styles.button}
        onPress={logInWithAnonymous}>
        <Text style={styles.buttonText}>Log in</Text>
      </Pressable>
    </View>
  );
};

function MyApp() {
  const app = useApp();

  return (
    <Text testID="logged-in-user-id">
      "Logged in as user with ID: {app.currentUser?.id}"
    </Text>
  );
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
    flexDirection: 'row',
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
