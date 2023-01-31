// :snippet-start: configure-realm
import React from 'react';
import {RealmContext} from '../../RealmConfig';
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

function AppWrapperLocal() {
  const {RealmProvider} = RealmContext;

  return (
    <RealmProvider>
      <MyApp />
    </RealmProvider>
  );
}
// :snippet-end:

test('Instantiate RealmProvider correctly', () => {
  render(<AppWrapperLocal />);
});
