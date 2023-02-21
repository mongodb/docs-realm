import React from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import {useEffect} from 'react';
import {App, Credentials} from 'realm';
import {useApp, createRealmContext, Realm} from '@realm/react';
import {render, waitFor} from '@testing-library/react-native';
import {View, Text, FlatList} from 'react-native';

const APP_ID = 'js-flexible-oseso';

class Cat extends Realm.Object {
  _id!: string;
  owner_id!: string;
  name!: string;
  birthDate?: Realm.Mixed;

  static schema = {
    name: 'Cat',
    properties: {
      _id: 'string',
      name: 'string',
      birthDate: 'mixed',
      owner_id: 'string',
    },
    primaryKey: '_id',
  };
}

class Bird extends Realm.Object<Bird> {
  _id!: string;
  owner_id!: string;
  name!: string;
  haveSeen!: boolean;
  birthDate?: Realm.Mixed;

  static schema = {
    name: 'Bird',
    properties: {
      _id: 'string',
      name: 'string',
      birthDate: 'mixed',
      owner_id: 'string',
      haveSeen: 'bool',
    },
    primaryKey: '_id',
  };
}

const config: Realm.Configuration = {
  schema: [Cat, Bird],
};
const RealmContext = createRealmContext(config);
let numSubs: number;

function AppWrapper() {
  const {RealmProvider} = RealmContext;

  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        {/* :snippet-start: initial-subscriptions */}
        <RealmProvider
          sync={{
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects(Cat));
              },
            },
            onError: console.log,
          }}>
          <SubscriptionManager />
        </RealmProvider>
        {/* :snippet-end: */}
      </UserProvider>
    </AppProvider>
  );
}

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Credentials.anonymous());
  }, []);

  return <></>;
}

function SubscriptionManager() {
  const primaryKey = '63f263bdc31795cd6a265c01';
  const {useRealm} = RealmContext;
  const realm = useRealm();
  // :snippet-start: usequery
  const {useQuery} = RealmContext;

  const allCats = useQuery(Cat);
  // :snippet-end:
  // :snippet-start: useobject
  const {useObject} = RealmContext;

  const oneCat = useObject(Cat, primaryKey);
  // :snippet-end:
  // :snippet-start: get-subscriptions
  const allSubscriptions = realm.subscriptions;
  // :snippet-end:
  // :snippet-start: get-sub-state
  const allSubscriptionState = realm.subscriptions.state;
  // :snippet-end:

  // :snippet-start: add-subscription
  const seenBirds = useQuery(Bird).filtered('haveSeen == true');

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      mutableSubs.add(seenBirds);
    });
    numSubs = realm.subscriptions.length; // :remove:
  });
  // :snippet-end:

  return (
    <View>
      <Text>Status of all subscriptions: {allSubscriptionState}</Text>
      <FlatList
        data={allSubscriptions}
        keyExtractor={subscription => subscription.id.toString()}
        renderItem={({item}) => <Text>{item.name}</Text>}
      />
      {oneCat && <Text>{oneCat._id}</Text>}
      <FlatList
        data={allCats}
        keyExtractor={cat => cat._id.toString()}
        renderItem={({item}) => <Text>{item._id}</Text>}
      />
    </View>
  );
}

afterEach(async () => {
  await App.getApp(APP_ID).currentUser?.logOut();
  Realm.deleteFile(config);
});

test('Instantiate AppWrapper and children correctly', async () => {
  render(<AppWrapper />);
  await waitFor(
    () => {
      expect(numSubs).toBe(2);
    },
    {timeout: 2000},
  );
});
