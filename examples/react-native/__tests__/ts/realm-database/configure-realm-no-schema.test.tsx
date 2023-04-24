// :snippet-start: configure-no-schema
import React from 'react';
import {createRealmContext} from '@realm/react';
// :remove-start:
import Business from '../Models/Business';
import Address from '../Models/Address';
import {Realm} from '@realm/react';
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

const noSchemaLocalRealm = createRealmContext();
// :snippet-end:

function AppWrapperNoSchema() {
  const {RealmProvider} = noSchemaLocalRealm;

  return (
    <RealmProvider>
      <MyApp />
    </RealmProvider>
  );
}

describe('Test accessing no schema realm', () => {
  const config = {
    schema: [Business, Address],
  };
  const realmAtDefaultPathExits = Realm.exists(config);

  beforeAll(async () => {
    // If there is no realm (with schema) on device, create one.
    if (!realmAtDefaultPathExits) {
      new Realm(config);
    }
  });

  test('Instantiate No Schema RealmProvider', () => {
    expect(realmAtDefaultPathExits).toBe(true);

    render(<AppWrapperNoSchema />);
  });
});
