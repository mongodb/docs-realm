import {StyleSheet, View, ScrollView} from 'react-native';

import {Create} from '../Create';
import {Read} from '../Read';
import {Update} from '../Update';
import {Delete} from '../Delete';
import {APP_ID} from '../../../../appServicesConfig';

// :snippet-start: qs-realm-sync
import React from 'react';
import {Credentials} from 'realm';
import {RealmProvider, AppProvider, UserProvider, useApp} from '@realm/react';
import {Button} from 'react-native';
// Import your models
import {Profile} from '../../../models';

// Expose a sync realm
export function AppWrapperSync() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          schema={[Profile]}
          sync={{
            flexible: true,
            onError: console.error,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects('Profile'));
              },
              rerunOnOpen: true,
            },
          }}>
          <RestOfApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}

function LogIn() {
  const app = useApp();
  async function logInUser() {
    await app.logIn(Credentials.anonymous());
  }
  return (
    <Button
      title="Log In"
      onPress={logInUser}
    />
  );
}
// :snippet-end:

const RestOfApp = () => {
  return (
    <ScrollView>
      <View style={styles.separator}>
        <Read />
      </View>
      <View style={styles.separator}>
        <Create />
      </View>
      <View style={styles.separator}>
        <Update />
      </View>
      <View style={styles.separator}>
        <Delete />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  separator: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
