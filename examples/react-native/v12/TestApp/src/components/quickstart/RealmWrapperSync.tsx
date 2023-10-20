import {Profile} from '../../models';
import {FindSortFilter} from './Filter';

import React from 'react';
import {RealmProvider, AppProvider, UserProvider, createRealmContext, useApp} from '@realm/react';
import {Button} from 'react-native';

function LogIn() {
    const app = useApp();
    async function logInUser() {
      // When anonymous authentication is enabled, users can immediately log
      // into your app without providing any identifying information.
      await app.logIn(Realm.Credentials.anonymous());
    }
    return (
      <Button
        title='Log In'
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
                  subs.add(realm.objects('Profile'));
                },
              },
            }}>
            <FindSortFilter />
          </RealmProvider>
        </UserProvider>
      </AppProvider>
    );
  }
  
  