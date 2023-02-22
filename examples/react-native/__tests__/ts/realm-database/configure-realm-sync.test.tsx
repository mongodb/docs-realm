// :snippet-start: configure-realm-sync-full
import React from 'react';
import {AppProvider, createRealmContext, UserProvider} from '@realm/react';
// :remove-start:
import {useEffect} from 'react';
import Realm from 'realm';
import {render, waitFor, fireEvent} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import {Button} from 'react-native';

const APP_ID = 'js-flexible-oseso';
let numberOfProfiles: number;

class Profile extends Realm.Object<Profile> {
  _id!: Realm.BSON.UUID;
  name!: string;

  static schema = {
    name: 'Profile',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      name: 'string',
    },
  };
}
// :remove-end:

const realmContext = createRealmContext({
  schema: [Profile],
});
const {RealmProvider} = realmContext;

function AppWrapperSync() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
            onError: console.error,
          }}>
          <RestOfApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
// :snippet-end:

// NOTE: Currently not testing the partition-based sync code. The App Services
// App we're using is for Flexible Sync and I don't think PB-based needs its
// own testing right now.
function AppWrapperPartitionSync() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        {/* :snippet-start: partition-based-config */}
        <RealmProvider
          sync={{
            partitionValue: 'testPartition',
            onError: console.error,
          }}>
          <RestOfApp />
        </RealmProvider>
        {/* :snippet-end: */}
      </UserProvider>
    </AppProvider>
  );
}

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Realm.Credentials.anonymous());
  }, []);

  return <></>;
}

function RestOfApp() {
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();
  const profiles = useQuery('Profile');

  useEffect(() => {
    realm.subscriptions.update((subs, myRealm) => {
      subs.add(myRealm.objects('Profile'));
    });
  });

  function addProfile() {
    realm.write(() => {
      new Profile(realm, {name: 'TestProfile', _id: new Realm.BSON.UUID()});
    });

    numberOfProfiles = profiles.length;
  }

  function clearRealm() {
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
  const {findByTestId} = render(<AppWrapperSync />);
  const addProfileButton = await findByTestId('test-add-profile');
  const clearRealmButton = await findByTestId('test-clear-realm');

  await waitFor(() => {
    // Create new profile and increment `numberOfProfiles`.
    fireEvent.press(addProfileButton);
  });

  await waitFor(
    () => {
      expect(numberOfProfiles).toBe(1);
    },
    {timeout: 2000},
  );

  await waitFor(
    () => {
      // Delete all realm objects and decrement `numberofProfiles`.
      // Runs after the test has passed.
      fireEvent.press(clearRealmButton);
    },
    {timeout: 3000},
  );
});
