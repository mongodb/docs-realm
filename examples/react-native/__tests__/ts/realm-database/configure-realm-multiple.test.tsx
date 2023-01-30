// :snippet-start: two-realm-contexts
import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import {RealmContext} from '../Models';
import {SecondRealmContext} from '../Models';
// :remove-start:
import {render} from '@testing-library/react-native';
import {useApp} from '@realm/react';
import {View, Text} from 'react-native';

const APP_ID = 'example-testers-kvjdy';

function AppSectionOne() {
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

function AppSectionTwo() {
  const app = useApp();

  if (app.id !== APP_ID) {
    throw new Error('Did not instantiate app client');
  }

  return (
    <View>
      <Text>Bar</Text>
    </View>
  );
}
// :remove-end:

function TwoRealmsWrapper() {
  const {RealmProvider: RealmProvider} = RealmContext;
  const {RealmProvider: SecondRealmProvider} = SecondRealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        {/* This realm uses Flexible Sync. */}
        <RealmProvider 
          sync={{flexible: true, onError: error => console.error(error)}}
        >
          <AppSectionOne />
        </RealmProvider>
        {/* This is a separate local-only realm. */}
        <SecondRealmProvider>
          <AppSectionTwo />
        </SecondRealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
// :snippet-end:

test('Instantiate SecondRealmProvider correctly', () => {
  render(<TwoRealmsWrapper />);
});
