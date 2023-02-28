// :snippet-start: check-sub-status
import React, {useEffect} from 'react';
import {AppProvider, UserProvider, createRealmContext} from '@realm/react';
// import object model
import Turtle from '../Models/Turtle';
import {Text, View} from 'react-native';
// :remove-start:
import {App, Credentials} from 'realm';
import {useApp, Realm} from '@realm/react';
import {render, waitFor} from '@testing-library/react-native';

const APP_ID = 'js-flexible-oseso';

let numSubs: number;

function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Credentials.anonymous());
  }, []);

  return <></>;
}
// :remove-end:

const config = {
  // Pass in imported object models
  schema: [Turtle],
};

const RealmContext = createRealmContext(config);
const {RealmProvider} = RealmContext;

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects(Turtle));
              },
            },
            onError: console.log,
          }}>
          <SubscriptionManager />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}

function SubscriptionManager() {
  const {useRealm} = RealmContext;
  const realm = useRealm();
  // :remove-start:
  // Test logic only in this section.
  const allSubscriptions = realm.subscriptions;

  allSubscriptions.length ? (numSubs = allSubscriptions.length) : (numSubs = 0);
  // :remove-end:

  // Returns state of all subscriptions, not individual subscriptions.
  // In this case, it's just the subscription for `Turtle` objects.
  const allSubscriptionState = realm.subscriptions.state;

  return (
    <View>
      <Text>Status of all subscriptions: {allSubscriptionState}</Text>
    </View>
  );
}
// :snippet-end:

// function SubscriptionManager() {
//   const primaryKey = '63f263bdc31795cd6a265c01';
//   const {useRealm} = RealmContext;
//   const realm = useRealm();
//   const {useQuery} = RealmContext;
//   const allCats = useQuery(Cat);
//   const {useObject} = RealmContext;
//   const oneCat = useObject(Cat, primaryKey);
//   const allSubscriptions = realm.subscriptions;
//   const allSubscriptionState = realm.subscriptions.state;
//   const seenBirds = useQuery(Bird).filtered('haveSeen == true');

// useEffect(() => {
//   realm.subscriptions.update(mutableSubs => {
//     mutableSubs.add(seenBirds);
//   });
//   numSubs = realm.subscriptions.length;
// });

//   return (
//     <View>
//       <Text>Status of all subscriptions: {allSubscriptionState}</Text>
//       <FlatList
//         data={allSubscriptions}
//         keyExtractor={subscription => subscription.id.toString()}
//         renderItem={({item}) => <Text>{item.name}</Text>}
//       />
//       {oneCat && <Text>{oneCat._id}</Text>}
//       <FlatList
//         data={allCats}
//         keyExtractor={cat => cat._id.toString()}
//         renderItem={({item}) => <Text>{item._id}</Text>}
//       />
//     </View>
//   );
// }

afterEach(async () => {
  await App.getApp(APP_ID).currentUser?.logOut();
  Realm.deleteFile(config);
});

test('Instantiate AppWrapper and children correctly', async () => {
  render(<AppWrapper />);
  await waitFor(
    () => {
      expect(numSubs).toBe(1);
    },
    {timeout: 2000},
  );
});
