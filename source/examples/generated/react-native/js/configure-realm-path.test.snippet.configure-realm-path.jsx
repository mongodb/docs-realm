import React from 'react';
import {AppProvider, createRealmContext, UserProvider} from '@realm/react';

const realmContext = createRealmContext({
  path: customRealmPath,
  schema: [Profile],
});
const {RealmProvider} = realmContext;

function AppWrapperSync({customBaseFilePath}) {
  return (
    <AppProvider id={APP_ID} baseFilePath={customBaseFilePath}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
          }}>
          <RestOfApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
