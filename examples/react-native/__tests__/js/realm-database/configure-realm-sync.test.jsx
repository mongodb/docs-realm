// :snippet-start: configure-realm-sync
import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';

import {RealmContext} from '../Models';
// :remove-start:
import {SecondRealmContext} from '../Models';
import {render} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import {View, Text} from 'react-native';

const APP_ID = 'example-testers-kvjdy';

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
          sync={{flexible: true, onError: error => console.error(error)}}>
          <MyApp />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
// :snippet-end:

// :snippet-start: two-realm-contexts
function AppWrapperTwoRealms() {
  const {RealmProvider} = RealmContext;
  const {SecondRealmProvider} = SecondRealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        <RealmProvider
          sync={{flexible: true, onError: error => console.error(error)}}>
          <MyApp />
        </RealmProvider>
        <SecondRealmProvider>
          <MyApp />
        </SecondRealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
// :snippet-end:

test('Instantiate RealmProvider correctly', () => {
  render(<AppWrapperSync />);
});

test('Instantiate SecondRealmProvider correctly', () => {
  render(<AppWrapperTwoRealms />);
});
