import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';

import {RealmContext} from '../Models';
function AppWrapperLocal() {
  const {RealmProvider} = RealmContext;

  return (
    <RealmProvider>
      <MyApp />
    </RealmProvider>
  );
}
