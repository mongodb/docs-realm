import React from 'react';
import {AppProvider, createRealmContext, UserProvider} from '@realm/react';

const realmContext = createRealmContext({
  schema: [Profile],
});
const {RealmProvider} = realmContext;

function AppWrapperTimeoutSync() {
  const realmAccessBehavior = {
    type: 'downloadBeforeOpen',
    timeOutBehavior: 'openLocalRealm',
    timeOut: 1000,
  };

  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
            newRealmFileBehavior: realmAccessBehavior,
            existingRealmFileBehavior: realmAccessBehavior,
            onError: console.error,
          }}>
          <RestOfApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
