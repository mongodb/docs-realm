import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import {RealmContext} from '../Models';
import {SecondRealmContext} from '../Models';

function AppWrapperTwoRealms() {
  const {RealmProvider: RealmProvider} = RealmContext;
  const {RealmProvider: SecondRealmProvider} = SecondRealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        <RealmProvider sync={{flexible: true, onError: error => console.error(error)}}>
          <MyApp />
        </RealmProvider>
        <SecondRealmProvider>
          <MyApp />
        </SecondRealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
