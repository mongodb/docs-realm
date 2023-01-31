import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import {RealmContext} from '../../RealmConfig';
import {SecondRealmContext} from '../../RealmConfig';

function TwoRealmsWrapper() {
  const {RealmProvider: RealmProvider} = RealmContext;
  const {RealmProvider: SecondRealmProvider} = SecondRealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        {/* This realm uses Flexible Sync. */}
        <RealmProvider 
          sync={{flexible: true, onError: error => console.error(error)}}
        >
          <AppSectionOne />
        </RealmProvider>
        {/* This is a separate local-only realm. */}
        <SecondRealmProvider>
          <AppSectionTwo />
        </SecondRealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
