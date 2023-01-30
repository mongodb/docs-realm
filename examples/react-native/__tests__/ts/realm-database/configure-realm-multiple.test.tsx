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

function AppWrapperTwoRealms() {
  const {RealmProvider: RealmProvider} = RealmContext;
  const {RealmProvider: SecondRealmProvider} = SecondRealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        <RealmProvider sync={{flexible: true, onError: error => console.error(error)}}>
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

test('Instantiate SecondRealmProvider correctly', () => {
  render(<AppWrapperTwoRealms />);
});
