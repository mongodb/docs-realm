import React from 'react';
import {AppProvider, UserProvider, useUser} from '@realm/react';
import {SyncedRealmContext} from '../RealmConfig';
const {RealmProvider, useRealm} = SyncedRealmContext;

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

test('Test pause/unpause sync', async () => {
  const {getByTestId} = render(<AppWrapper />);
  const button = await waitFor(() => getByTestId(testId));
  fireEvent.press(button);
  await waitFor(() => {
    expect(higherScopedRealm.syncSession?.state).toBe('inactive');
  });
  fireEvent.press(button);
  await waitFor(() => {
    expect(higherScopedRealm.syncSession?.state).toBe('active');
  });
});
