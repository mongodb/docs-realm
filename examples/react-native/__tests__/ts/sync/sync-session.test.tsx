// :snippet-start: sync-session
import React from 'react';
import {AppProvider, UserProvider, useUser} from '@realm/react';
import {SyncedRealmContext} from '../RealmConfig';
const {useRealm} = SyncedRealmContext;
// :remove-start:
const {RealmProvider} = SyncedRealmContext;
import Realm from 'realm';
import {render, waitFor, fireEvent} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import {Button} from 'react-native';

const APP_ID = 'js-flexible-oseso';
const testId = 'test-toggle-sync';
function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={<LogIn />}>
        <RealmWrapper>
          <ToggleSyncSession />
        </RealmWrapper>
      </UserProvider>
    </AppProvider>
  );
}

type RealmWrapperProps = {
  children: React.ReactNode;
};

function RealmWrapper({children}: RealmWrapperProps) {
  const user = useUser();
  return (
    <RealmProvider
      sync={{
        user: user!,
        flexible: true,
        initialSubscriptions: {
          update(subs, realm) {
            subs.add(realm.objects('Invoice'));
          },
        },
        onError: (_, err) => {
          console.log('error is:', err);
        },
      }}>
      {children}
    </RealmProvider>
  );
}

function LogIn() {
  const app = useApp();

  React.useEffect(() => {
    app
      .logIn(Realm.Credentials.anonymous())
      .then(user => console.debug('logged in ', user.id));
  }, []);
  return <></>;
}

let higherScopedRealm: Realm;
// :remove-end:

function ToggleSyncSession() {
  const realm = useRealm();
  higherScopedRealm = realm; // :remove:
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
      testID={testId} // :remove:
    />
  );
}
// :snippet-end:

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
