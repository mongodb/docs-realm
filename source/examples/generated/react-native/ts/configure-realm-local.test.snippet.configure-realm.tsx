import React from 'react';
import {RealmProvider} from '@realm/react';

function AppWrapperLocal() {
  return (
    <RealmProvider schema={[YourSchema]}>
      <MyApp />
    </RealmProvider>
  );
}
