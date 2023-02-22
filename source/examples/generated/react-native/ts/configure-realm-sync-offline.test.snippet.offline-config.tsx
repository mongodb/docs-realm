import React from 'react';
import {AppProvider, createRealmContext, UserProvider} from '@realm/react';

const realmContext = createRealmContext({
  schema: [Profile],
});
const {RealmProvider} = realmContext;

function AppWrapperOfflineSync() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
            newRealmFileBehavior: {type: 'openImmediately'},
            existingRealmFileBehavior: {type: 'openImmediately'},
            onError: console.error,
          }}>
          <RestOfApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
