import React from 'react';
import {RealmContext} from '../Models';

function AppWrapperLocal() {
  const {RealmProvider} = RealmContext;

  return (
    <RealmProvider>
      <MyApp />
    </RealmProvider>
  );
}
