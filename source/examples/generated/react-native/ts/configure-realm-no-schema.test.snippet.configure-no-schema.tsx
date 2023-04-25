import React from 'react';
import {createRealmContext} from '@realm/react';
import {Text, FlatList} from 'react-native';

// To access a realm at the default path, do not pass a config object.
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
  const realm = useRealm();
  const realmSchemas = realm.schema;

  return (
    <FlatList
      data={realmSchemas}
      renderItem={({item}) => {
        <Text>{item.name}</Text>;
      }}
    />
  );
}
