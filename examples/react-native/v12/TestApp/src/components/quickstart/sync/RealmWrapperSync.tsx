import React from 'react';
import {RealmProvider, AppProvider, UserProvider, useApp} from '@realm/react';
import {Button, Text} from 'react-native';

import {Profile} from '../../../models';
import {APP_ID} from '../../../../appServicesConfig';

function LogIn() {
  const app = useApp();
  async function logInUser() {
    await app.logIn(Realm.Credentials.anonymous());
  }
  return (
    <Button
      title="Log In"
      onPress={logInUser}
    />
  );
}

// Expose a sync realm
export function AppWrapperSync() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
            onError: console.error,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects(Profile));
              },
            },
          }}>
          <Text>Test</Text>
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
