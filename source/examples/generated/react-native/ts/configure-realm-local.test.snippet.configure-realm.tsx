import React from 'react';
import {RealmContext} from '../RealmConfig';

function AppWrapperLocal() {
  const {RealmProvider} = RealmContext;

  return (
    <RealmProvider>
      <MyApp />
    </RealmProvider>
  );
}
