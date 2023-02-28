// :snippet-start: add-query
import React, {useEffect} from 'react';
import {AppProvider, UserProvider, createRealmContext} from '@realm/react';
// import object model
import Bird from '../Models/Bird';
import {Text, FlatList} from 'react-native';
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
  schema: [Bird],
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
            onError: console.log,
          }}>
          <SubscriptionManager />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}

function SubscriptionManager() {
  const {useRealm, useQuery} = RealmContext;
  const realm = useRealm();

  // Pass object model to useQuery and filter results.
  // This does not create a subscription.
  const seenBirds = useQuery(Bird).filtered('haveSeen == true');

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(seenBirds);
    });
    numSubs = realm.subscriptions.length; // :remove:
  });

  return (
    <FlatList
      data={seenBirds}
      keyExtractor={bird => bird._id.toString()}
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
