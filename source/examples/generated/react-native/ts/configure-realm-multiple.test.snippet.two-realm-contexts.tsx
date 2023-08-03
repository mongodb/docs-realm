import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';

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

function TwoRealmsWrapper() {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <UserProvider fallback={LogIn}>
          {/* This realm uses Flexible Sync. */}
          <SharedDocumentRealmProvider sync={{flexible: true}}>
            <AppSectionOne />
          </SharedDocumentRealmProvider>
        </UserProvider>
      </AppProvider>

      {/* This is a separate local-only realm. */}
      <LocalDocumentRealmProvider>
        <AppSectionTwo />
      </LocalDocumentRealmProvider>
    </View>
  );
}

function AppSectionOne() {
  const realm = useSharedDocumentRealm();

  // Work with shared documents...
}

function AppSectionTwo() {
  const realm = useLocalDocumentRealm();

  // Work with local documents...
}
