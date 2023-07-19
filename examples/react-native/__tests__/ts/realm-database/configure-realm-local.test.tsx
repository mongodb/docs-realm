// :snippet-start: configure-realm
import React from 'react';
import {Realm, RealmProvider, useRealm} from '@realm/react';
// :remove-start:
import {render, waitFor} from '@testing-library/react-native';
import {View, Text} from 'react-native';

let isRealmClosed = true;

function MyApp() {
  const realm = useRealm();

  isRealmClosed = realm.isClosed;

  return (
    <View>
      <Text>Foo</Text>
    </View>
  );
}
// :remove-end:

class Turtle extends Realm.Object {
  _id!: string;
  owner_id!: string;
  name!: string;
  birthDate?: Realm.Mixed;

  static schema = {
    name: 'Turtle',
    properties: {
      _id: 'string',
      name: 'string',
      birthDate: 'mixed',
      owner_id: 'string',
    },
    primaryKey: '_id',
  };
}

function AppWrapperLocal() {
  return (
    <RealmProvider schema={[Turtle]}>
      <MyApp />
    </RealmProvider>
  );
}
// :snippet-end:

test('Instantiate RealmProvider correctly', async () => {
  render(<AppWrapperLocal />);

  await waitFor(() => {
    expect(isRealmClosed).toBe(false);
  });
});
