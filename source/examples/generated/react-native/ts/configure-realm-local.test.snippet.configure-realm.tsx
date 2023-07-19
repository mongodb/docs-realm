import React from 'react';
import {Realm, RealmProvider, useRealm} from '@realm/react';

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
