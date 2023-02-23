import React from 'react';
import {SyncedRealmContext} from '../RealmConfig';
const {useRealm} = SyncedRealmContext;

function ToggleSyncSession() {
  const realm = useRealm();
  const [isPaused, setIsPaused] = React.useState(false);

  async function toggleSyncSession() {
    if (isPaused) {
      await realm.syncSession?.resume();
    } else {
      await realm.syncSession?.pause();
    }
    setIsPaused(!isPaused);
  }

  return (
    <Button
      title={isPaused ? 'Pause Sync' : 'Unpause Sync'}
      onPress={toggleSyncSession}
    />
  );
}
