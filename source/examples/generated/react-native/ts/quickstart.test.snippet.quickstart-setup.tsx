import React from 'react';
import Realm from 'realm';
import {AppProvider, UserProvider, createRealmContext} from '@realm/react';

class Profile extends Realm.Object<Profile> {
  _id!: Realm.BSON.UUID;
  name!: string;

  static schema = {
    name: 'Profile',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      name: 'string',
    },
  };
}

const realmConfig: Realm.Configuration = {
  schema: [Profile],
};
const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

function AppWrapper() {
  return (
    <RealmProvider>
      <RestOfApp />
    </RealmProvider>
  );
}
