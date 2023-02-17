import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import {SimpleRealmContext} from '../RealmConfig';

function AppWrapperSync() {
  const {RealmProvider} = SimpleRealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
            onError: console.error,
          }}>
          <MyApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
