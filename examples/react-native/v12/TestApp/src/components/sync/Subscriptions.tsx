import React, {useEffect} from 'react';
import Realm, {BSON, ObjectSchema, Credentials} from 'realm';
import {
  AppProvider,
  UserProvider,
  RealmProvider,
  useApp,
  useRealm,
  useQuery,
} from '@realm/react';
import {View, Text, Button, TextInput, FlatList} from 'react-native';

import {APP_ID} from '../../../__tests__/testConfig';

class Bird extends Realm.Object<Bird> {
  _id!: BSON.ObjectId;
  name!: string;
  haveSeen!: boolean;

  static schema: ObjectSchema = {
    name: 'Bird',
    properties: {
      _id: 'objectId',
      name: 'string',
      haveSeen: 'bool',
    },
    primaryKey: '_id',
  };
}

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Credentials.anonymous());
  }, []);

  return <></>;
}

export const Subscriptions = () => {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider schema={[Bird]} sync={{flexible: true}}>
          <SubscriptionManager />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
};

function SubscriptionManager() {
  const realm = useRealm();
  const seenBirds = realm.objects('Bird').filtered('haveSeen == true');

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      mutableSubs.removeAll(); // :remove:
      // Create subscription query
      const seenBirdsSubQuery = realm
        .objects('Bird')
        .filtered('haveSeen == true');

      // Create subscription for filtered results.
      mutableSubs.add(seenBirdsSubQuery, {name: 'seenBirds'});
    });
  });

  return (
    <>
      <Text>Stuff</Text>
    </>
    // <FlatList
    //   data={seenBirds}
    //   keyExtractor={bird => bird._id.toString()}
    //   renderItem={({item}) => <Text>{item._id}</Text>}
    // />
  );
}
