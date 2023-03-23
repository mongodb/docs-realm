// :snippet-start: configure-realm
import React from 'react';
import {RealmContext} from '../RealmConfig';
// :remove-start:
import {render} from '@testing-library/react-native';
import {View, Text} from 'react-native';

function MyApp() {
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
