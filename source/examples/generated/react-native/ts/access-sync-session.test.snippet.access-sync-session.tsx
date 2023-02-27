import React from 'react';
import {SyncedRealmContext} from '../RealmConfig';
const {useRealm} = SyncedRealmContext;

function AccessSyncSession() {
  const realm = useRealm();

  async function workWithSyncSession() {
    const {syncSession} = realm;
    // Do stuff with sync session...
  }

  // ...

}
