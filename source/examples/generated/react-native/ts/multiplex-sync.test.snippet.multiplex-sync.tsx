import React, {useEffect} from 'react';
import {SyncedRealmContext} from '../RealmConfig';
import {AppProvider, UserProvider, useUser, useApp, Realm} from '@realm/react';
function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={<LogIn />}>
        <RealmWrapper>
          <RestOfApp />
        </RealmWrapper>
      </UserProvider>
    </AppProvider>
  );
}

type RealmWrapperProps = {
  children: React.ReactNode;
};

function RealmWrapper({children}: RealmWrapperProps) {
  const app = useApp();

  useEffect(() => {
    Realm.App.Sync.enableSessionMultiplexing(app);
  }, []);

  return <RealmProvider sync={{flexible: true}}>{children}</RealmProvider>;
}
