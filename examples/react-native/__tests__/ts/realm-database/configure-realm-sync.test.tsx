// :snippet-start: configure-realm-sync-full
import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import {SimpleRealmContext} from '../RealmConfig';
// :remove-start:
import {useEffect} from 'react';
import Realm from 'realm';
import {render, waitFor} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import {View, Text} from 'react-native';
import Profile from '../Models/Profile';

const APP_ID = 'js-flexible-oseso';
let numberOfProfiles: number;

function LogIn() {
  const app = useApp();
  console.log(`::LOGIN:: in LogIn at: ${performance.now()}`);

  useEffect(() => {
    console.log(`::LOGIN:: in LogIn effect at: ${performance.now()}`);
    app.logIn(Realm.Credentials.anonymous());
  }, []);

  return <></>;
}

function MyApp() {
  console.log(`::MYAPP:: in MyApp at: ${performance.now}`);

  const {useRealm, useQuery} = SimpleRealmContext;
  const realm = useRealm();
  const profiles = useQuery('Profile');

  useEffect(() => {
    console.log(`::MYAPP:: in MyApp effect at: ${performance.now}`);

    realm.subscriptions.update((subs, myRealm) => {
      subs.add(myRealm.objects('Profile'));
    });

    // TODO: This wrote a million times. Why would it do that? Theory: MyApp
    // is re-rendered every time there's a change to the Profile sub?
    // TODO: Add a button that the test can click to add the new Profile.
    // realm.write(() => {
    //   new Profile(realm, {name: 'TestProfile', _id: new Realm.BSON.UUID()});
    // });

    numberOfProfiles = profiles.length;

    // Delete new profile object after test has completed.
    setTimeout(() => {
      realm.write(() => {
        realm.deleteAll();
      });
      numberOfProfiles = 0;
    }, 1000);

  });

  return (
    <View>
      <Text>Foo</Text>
    </View>
  );
}
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

function AppWrapperOfflineSync() {
  const {RealmProvider} = SimpleRealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        {/* :snippet-start: offline-config */}
        <RealmProvider
          sync={{
            flexible: true,
            newRealmFileBehavior: {type: 'openImmediately'},
            existingRealmFileBehavior: {type: 'openImmediately'},
            onError: error => console.error(error),
          }}
          fallback={<>{console.log(`::REALMPROVIDER:: falling back at ${performance.now()}`)}</>}>
          <MyApp />
        </RealmProvider>
        {/* :snippet-end: */}
      </UserProvider>
    </AppProvider>
  );
}

// function AppWrapperTimeoutSync() {
//   const {RealmProvider} = SimpleRealmContext;
//   const realmAccessBehavior = {
//     type: 'downloadBeforeOpen',
//     timeOut: 1000,
//     timeOutBehavior: 'openLocalRealm',
//   };

//   return (
//     <AppProvider id={APP_ID}>
//       <UserProvider fallback={LogIn}>
//         {/* :snippet-start: timeout-config */}
//         <RealmProvider
//           sync={{
//             flexible: true,
//             newRealmFileBehavior: realmAccessBehavior,
//             existingRealmFileBehavior: realmAccessBehavior,
//             onError: error => console.error(error),
//           }}
//           fallback={<>{console.log(`::REALMPROVIDER:: falling back at ${performance.now()}`)}</>}>
//           <MyApp />
//         </RealmProvider>
//         {/* :snippet-end: */}
//       </UserProvider>
//     </AppProvider>
//   );
// }

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
            onError: error => console.error(error),
          }}>
          <MyApp />
        </RealmProvider>
        {/* :snippet-end: */}
      </UserProvider>
    </AppProvider>
  );
}

// afterEach(async () => {
//   // NOTE: afterEach seems to cause a re-render before the test is totally complete.
//   // This causes the LogIn fallback to run again.
//   // Also causes issues with other tests. the don't run properly, but say
//   // they pass.
//   console.log(`::AFTEREACH:: starting cleanup at: ${performance.now()}`);

//   await Realm.App.getApp(APP_ID).currentUser?.logOut();
  
//   console.log(`::AFTEREACH:: ending cleanup at: ${performance.now()}`);
// });

test('Instantiate AppWrapperSync and test sync', async () => {
  console.log(`::TEST:: start AppWrapperSync test at: ${performance.now()}`);
  render(<AppWrapperSync />);

  await waitFor(
    () => {
      expect(numberOfProfiles).toBe(1);
    },
    {timeout: 5000},
  );
  console.log(`::TEST:: end AppWrapperSync test at: ${performance.now()}`);
});

test('Instantiate AppWrapperOfflineSync and test sync', async () => {
  console.log(`::TEST:: start AppWrapperOfflineSync test at: ${performance.now()}`);
  render(<AppWrapperOfflineSync />);

  await waitFor(
    () => {
      expect(numberOfProfiles).toBe(1);
    },
    {timeout: 5000},
  );
  console.log(`::TEST:: end AppWrapperOfflineSync test at: ${performance.now()}`);
});

// test('Instantiate AppWrapperTimeoutSync and test sync', async () => {
//   render(<AppWrapperTimeoutSync />);

//   await waitFor(
//     () => {
//       expect(numberOfProfiles).toBe(1);
//     },
//     {timeout: 5000},
//   );
// });

// test('Instantiate offline RealmProvider correctly', () => {
//   render(<AppWrapperOfflineSync />);
// });

// test('Instantiate timeout RealmProvider correctly', () => {
//   render(<AppWrapperTimeoutSync />);
// });
