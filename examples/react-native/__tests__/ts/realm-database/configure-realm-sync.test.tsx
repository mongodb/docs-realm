// :snippet-start: configure-realm-sync
import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import {RealmContext} from '../RealmConfig';
// :remove-start:
import {render} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import {View, Text} from 'react-native';

const APP_ID = 'js-flexible-oseso';

function MyApp() {
  const app = useApp();

  if (app.id !== APP_ID) {
    throw new Error('Did not instantiate app client');
  }

  return (
    <View>
      <Text>Foo</Text>
    </View>
  );
}
// :remove-end:

function AppWrapperSync() {
  const {RealmProvider} = RealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        <RealmProvider
          sync={{
            flexible: true,
            onError: error => console.error(error),
          }}>
          <MyApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
// :snippet-end:

// :snippet-start: partition-based-config
function AppWrapperPartitionSync() {
  const {RealmProvider} = RealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        <RealmProvider
          sync={{
            partitionValue: 'testPartition',
            onError: error => console.error(error),
          }}>
          <MyApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
// :snippet-end:

// :snippet-start: offline-config
function AppWrapperOfflineSync() {
  const {RealmProvider} = RealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        <RealmProvider
          sync={{
            flexible: true,
            newRealmFileBehavior: {type: 'openImmediately'},
            existingRealmFileBehavior: {type: 'openImmediately'},
            onError: error => console.error(error),
          }}>
          <MyApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
// :snippet-end:

// :snippet-start: timeout-config
function AppWrapperTimeoutSync() {
  const {RealmProvider} = RealmContext;
  const realmAccessBehavior = {
    type: 'downloadBeforeOpen',
    timeOut: 1000,
    timeOutBehavior: 'openLocalRealm',
  };

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        <RealmProvider
          sync={{
            flexible: true,
            newRealmFileBehavior: realmAccessBehavior,
            existingRealmFileBehavior: realmAccessBehavior,
            onError: error => console.error(error),
          }}>
          <MyApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
// :snippet-end:

test('Instantiate RealmProvider correctly', () => {
  render(<AppWrapperSync />);
});

test('Instantiate Partition-Based Sync RealmProvider correctly', () => {
  render(<AppWrapperPartitionSync />);
});

test('Instantiate offline RealmProvider correctly', () => {
  render(<AppWrapperOfflineSync />);
});

test('Instantiate timeout RealmProvider correctly', () => {
  render(<AppWrapperTimeoutSync />);
});
