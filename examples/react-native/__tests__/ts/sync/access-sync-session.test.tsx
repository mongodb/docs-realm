// :snippet-start: access-sync-session
import React from 'react';
import {SyncedRealmContext} from '../RealmConfig';
const {useRealm} = SyncedRealmContext;
// :remove-start:
const {RealmProvider} = SyncedRealmContext;
import {AppProvider, UserProvider, useUser} from '@realm/react';
import Realm from 'realm';
import {render, waitFor, fireEvent} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import {Button} from 'react-native';

const APP_ID = 'js-flexible-oseso';
const testId = 'test-access-sync-session';
function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={<LogIn />}>
        <RealmWrapper>
          <AccessSyncSession />
        </RealmWrapper>
      </UserProvider>
    </AppProvider>
  );
}

type RealmWrapperProps = {
  children: React.ReactNode;
};

function RealmWrapper({children}: RealmWrapperProps) {
  const user = useUser()!;
  return (
    <RealmProvider
      sync={{
        user,
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

let higherScopedSyncSession: Realm.App.Sync.Session | null;
// :remove-end:

function AccessSyncSession() {
  const realm = useRealm();

  async function workWithSyncSession() {
    const {syncSession} = realm;
    // Do stuff with sync session...
    higherScopedSyncSession = syncSession; // :remove:
  }

  // ...

  // :remove-start:
  return (
    <Button title='Click me!' onPress={workWithSyncSession} testID={testId} />
  );
  // :remove-end:
}
// :snippet-end:

test('Test pause/unpause sync', async () => {
  const {getByTestId} = render(<AppWrapper />);
  const button = await waitFor(() => getByTestId(testId));
  fireEvent.press(button);
  await waitFor(() => {
    expect(higherScopedSyncSession).toBeInstanceOf(Realm.App.Sync.Session);
  });
});
