import Realm, {ObjectSchema} from 'realm';
import {Profile} from '../../models'
import {RealmProvider, createRealmContext} from '@realm/react';
import {useState} from 'react';
// :snippet-end:

// Create a configuration object
const realmConfig: Realm.Configuration = {
    schema: [Profile],
  };
  
  // Create a realm context
  const {RealmProvider, useRealm, useObject, useQuery} =
    createRealmContext(realmConfig);
  
  // Expose a realm: why is realm provdier not working???
  function AppWrapper() {
    return (
      <RealmProvider> //
        <RestOfApp />
      </RealmProvider>
    );
  }
  // :snippet-end: