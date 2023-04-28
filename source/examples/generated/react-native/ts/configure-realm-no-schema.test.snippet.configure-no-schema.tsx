import React from 'react';
import {createRealmContext} from '@realm/react';

// To access a realm at the default path,
// do not pass a config object.
// Requires a realm that has already been created.
const defaultPathLocalRealm = createRealmContext();
// You can still access providers and hooks.
const {RealmProvider} = defaultPathLocalRealm;

function AppWrapper() {
  return (
    <RealmProvider>
      <RestOfApp />
    </RealmProvider>
  );
}
