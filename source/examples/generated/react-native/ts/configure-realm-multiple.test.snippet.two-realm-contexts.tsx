import React from 'react';
import {RealmProvider, AppProvider, UserProvider} from '@realm/react';

function TwoRealmsWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        {/* This realm uses Flexible Sync. */}
        <RealmProvider schema={[Turtle]} sync={{flexible: true}}>
          <AppSectionOne />
        </RealmProvider>
        {/* This is a separate local-only realm. */}
        <RealmProvider schema={[Cat]}>
          <AppSectionTwo />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
