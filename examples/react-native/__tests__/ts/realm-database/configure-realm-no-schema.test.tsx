// :snippet-start: configure-no-schema
import React from 'react';
import {createRealmContext} from '@realm/react';
import {Text, FlatList} from 'react-native';
// :remove-start:
import Business from '../Models/Business';
import Address from '../Models/Address';
import {Realm} from '@realm/react';
import {render} from '@testing-library/react-native';
// :remove-end:

let higherScopeSchema: Realm.CanonicalObjectSchema[]; // :remove:
// To access a realm at the default path, do not pass a config object.
// Requires a realm that has already been created.
const defaultPathLocalRealm = createRealmContext();
// You can still access providers and hooks.
const {RealmProvider, useRealm} = defaultPathLocalRealm;

function AppWrapper() {
  return (
    <RealmProvider>
      <App />
    </RealmProvider>
  );
}

function App() {
  const realm: Realm = useRealm();
  const realmSchemas = realm.schema;
  higherScopeSchema = realm.schema; // :remove:

  return (
    <FlatList
      data={realmSchemas}
      renderItem={({item}) => {
        <Text>{item.name}</Text>;
      }}
    />
  );
}
// :snippet-end:

describe('Test accessing no schema realm', () => {
  beforeAll(() => {
    // Close and delete realm at the default path.
    Realm.clearTestState();

    // Open new realm with schemas.
    Realm.open({
      schema: [Business, Address],
    });
  });

  test('Instantiate RealmProvider', () => {
    // Render the component, which creates/opens a realm with a schema
    // using RealmProvider.
    render(<AppWrapper />);

    // Check that higherScopeSchema has schemas.
    expect(higherScopeSchema.length).toBe(2);
  });

  // AppWrapper unmounts after the previous test, which means the realm with
  // a schema has been closed.
  test('Open realm with no schema and match with higherScopeSchema', () => {
    // Reopen realm without a schema
    const reopenedRealm = new Realm();

    // Expect the schemas to match
    expect(reopenedRealm.schema.length).toBe(2);
    expect(reopenedRealm.schema).toEqual(higherScopeSchema);
  });
});
