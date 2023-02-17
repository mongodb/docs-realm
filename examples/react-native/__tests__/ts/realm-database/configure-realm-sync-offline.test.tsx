import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import {SimpleRealmContext} from '../RealmConfig';
import {useEffect} from 'react';
import Realm from 'realm';
import {render, waitFor, fireEvent} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import {Button} from 'react-native';
import Profile from '../Models/Profile';

const APP_ID = 'js-flexible-oseso';
let numberOfProfiles: number;

function AppWrapperOfflineSync() {
  console.log(
    `::APPWRAPPEROFFLINE:: in offline wrapper at ${performance.now()}`,
  );
  const {RealmProvider} = SimpleRealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        {/* :snippet-start: offline-config */}
        <RealmProvider
          sync={{
            flexible: true,
            // TODO: Figure out what's up with "type" not being assignable to string
            // newRealmFileBehavior: {type: 'openImmediately'},
            // existingRealmFileBehavior: {type: 'openImmediately'},
            onError: console.error,
          }}
          fallback={
            <>
              {console.log(
                `::REALMPROVIDER:: falling back at ${performance.now()}`,
              )}
            </>
          }>
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

test('Instantiate AppWrapperOfflineSync and test sync', async () => {
  console.log(
    `::::TEST:::: start AppWrapperOfflineSync test at: ${performance.now()}`,
  );

  const {findByTestId} = render(<AppWrapperOfflineSync />);
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
