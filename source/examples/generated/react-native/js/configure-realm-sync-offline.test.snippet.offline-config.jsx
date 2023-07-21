import React from 'react';
import {
  AppProvider,
  UserProvider,
  RealmProvider,
  useQuery,
  useRealm,
} from '@realm/react';

function AppWrapperOfflineSync() {
  const realmAccessBehavior = {
    type: 'openImmediately',
  };

  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          schema={[Profile]}
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
