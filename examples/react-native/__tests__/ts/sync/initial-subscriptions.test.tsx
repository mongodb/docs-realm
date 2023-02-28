// :snippet-start: initial-subscriptions
import React from 'react';
import {AppProvider, UserProvider, createRealmContext} from '@realm/react';
// import object model
import Turtle from '../Models/Turtle';
import {Text, FlatList} from 'react-native';
// :remove-start:
import {useEffect} from 'react';
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
            // Set initial subscription for all objects of type `Turtle`.
            // You can add more than one subscription here.
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
  const {useQuery} = RealmContext;
  // :remove-start:
  // Test logic only in this section.
  const {useRealm} = RealmContext;
  const realm = useRealm();
  const allSubscriptions = realm.subscriptions;

  allSubscriptions.length ? (numSubs = allSubscriptions.length) : (numSubs = 0);
  // :remove-end:

  // Pass object model to useQuery to get all objects of type `Turtle`.
  // These results automatically update with changes from other devices
  // because we created a subscription with `initialSubscriptions`.
  const allTurtles = useQuery(Turtle);

  return (
    <FlatList
      data={allTurtles}
      keyExtractor={turtle => turtle._id.toString()}
      renderItem={({item}) => <Text>{item._id}</Text>}
    />
  );
}
// :snippet-end:

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
