// :snippet-start: configure-realm-sync-full
import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import {SimpleRealmContext} from '../RealmConfig';
// :remove-start:
import {useEffect} from 'react';
import Realm from 'realm';
import {render, waitFor, fireEvent} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import {Button} from 'react-native';
import Profile from '../Models/Profile';

const APP_ID = 'js-flexible-oseso';
let numberOfProfiles: number;
// :remove-end:

function AppWrapperSync() {
  const {RealmProvider} = SimpleRealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        {/* :snippet-start: configure-realm-sync */}
        <RealmProvider
          sync={{
            flexible: true,
            onError: console.error,
          }}>
          <MyApp />
        </RealmProvider>
        {/* :snippet-end: */}
      </UserProvider>
    </AppProvider>
  );
}
// :snippet-end:

// NOTE: Currently not testing the partition-based sync code. The App Services
// App we're using is for Flexible Sync and I don't think PB-based needs its
// own testing right now.
function AppWrapperPartitionSync() {
  const {RealmProvider} = SimpleRealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        {/* :snippet-start: partition-based-config */}
        <RealmProvider
          sync={{
            partitionValue: 'testPartition',
            onError: console.error,
          }}>
          <MyApp />
        </RealmProvider>
        {/* :snippet-end: */}
      </UserProvider>
    </AppProvider>
  );
}

function LogIn() {
  console.log(`::LOGIN:: in LogIn at: ${performance.now()}`);
  const app = useApp();

  useEffect(() => {
    console.log(`::LOGIN:: in LogIn effect at: ${performance.now()}`);
    app.logIn(Realm.Credentials.anonymous());
  }, []);

  return <></>;
}

function MyApp() {
  console.log(`::MYAPP:: in MyApp at: ${performance.now()}`);

  const {useRealm, useQuery} = SimpleRealmContext;
  const realm = useRealm();
  const profiles = useQuery('Profile');

  useEffect(() => {
    console.log(`::MYAPP:: in MyApp effect at: ${performance.now()}`);

    realm.subscriptions.update((subs, myRealm) => {
      subs.add(myRealm.objects('Profile'));
    });
  });

  function addProfile() {
    console.log(`::MYAPP:: adding profile at: ${performance.now()}`);
    realm.write(() => {
      new Profile(realm, {name: 'TestProfile', _id: new Realm.BSON.UUID()});
    });

    numberOfProfiles = profiles.length;
  }

  function clearRealm() {
    console.log(`::MYAPP:: clearing the realm at: ${performance.now()}`);
    realm.write(() => {
      realm.deleteAll();
    });

    numberOfProfiles = 0;
  }

  return (
    <>
      <Button onPress={addProfile} testID='test-add-profile' title='Test Me!' />
      <Button onPress={clearRealm} testID='test-clear-realm' title='Test Me!' />
    </>
  );
}

test('Instantiate AppWrapperSync and test sync', async () => {
  console.log(
    `::::TEST:::: start AppWrapperSync test at: ${performance.now()}`,
  );

  const {findByTestId} = render(<AppWrapperSync />);
  const addProfileButton = await findByTestId('test-add-profile');
  const clearRealmButton = await findByTestId('test-clear-realm');

  await waitFor(
    () => {
      // Create new profile and increment `numberOfProfiles`.
      fireEvent.press(addProfileButton);
    },
    {timeout: 5000},
  );

  await waitFor(
    () => {
      expect(numberOfProfiles).toBe(1);
    },
    {timeout: 5000},
  );

  await waitFor(
    () => {
      // Delete all realm objects and decrement `numberofProfiles`.
      // Runs after the test has passed.
      fireEvent.press(clearRealmButton);
    },
    {timeout: 5000},
  );

  console.log(`::::TEST:::: end AppWrapperSync test at: ${performance.now()}`);
});
