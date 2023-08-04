import React from 'react';
import {
  Realm,
  AppProvider,
  UserProvider,
  createRealmContext,
} from '@realm/react';

class SharedDocument extends Realm.Object<SharedDocument> {
  _id!: Realm.BSON.ObjectId;
  owner_id!: Realm.BSON.ObjectId;
  title!: string;
  createdDate?: Date;

  static schema = {
    name: 'SharedDocument',
    properties: {
      _id: 'objectId',
      owner_id: 'objectId',
      title: 'string',
      createdDate: 'date',
    },
    primaryKey: '_id',
  };
}

class LocalDocument extends Realm.Object<LocalDocument> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  createdDate?: Date;

  static schema = {
    name: 'LocalDocument',
    properties: {
      _id: 'objectId',
      name: 'string',
      createdDate: 'date',
    },
  };
}

const SharedRealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [SharedDocument],
});

const LocalRealmContext = createRealmContext({
  // Pass all of your secondary models into the schema value.
  schema: [LocalDocument],
});

const {
  RealmProvider: SharedDocumentRealmProvider,
  useRealm: useSharedDocumentRealm,
} = SharedRealmContext;
const {
  RealmProvider: LocalDocumentRealmProvider,
  useRealm: useLocalDocumentRealm,
} = LocalRealmContext;
