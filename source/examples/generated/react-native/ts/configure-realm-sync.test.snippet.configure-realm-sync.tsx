import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';

import {RealmContext} from '../Models';
function AppWrapperSync() {
  const {RealmProvider} = RealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        <RealmProvider sync={{flexible: true, onError: error => console.error(error)}}>
          <MyApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
