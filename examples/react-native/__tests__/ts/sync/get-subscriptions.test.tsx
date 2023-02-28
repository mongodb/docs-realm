// :replace-start: {
//   "terms": {
//     "SubscriptionRealmContext": "RealmContext"
//   }
// }
// :snippet-start: get-subscriptions
import React, {useEffect} from 'react';
import {AppProvider, UserProvider} from '@realm/react';
// get realm context from createRealmContext()
import {SubscriptionRealmContext} from '../RealmConfig';
import {Text, FlatList} from 'react-native';
// :remove-start:
import {App, Credentials} from 'realm';
import {useApp} from '@realm/react';
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

const {RealmProvider} = SubscriptionRealmContext;

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects('Turtle'));
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
// :remove-end:

const {useRealm, useQuery} = SubscriptionRealmContext;

function SubscriptionManager() {
  const realm = useRealm();

  // Returns a subscription set that contains all subscriptions.
  const allSubscriptions = realm.subscriptions;

  // Pass object model to useQuery and filter results.
  // This does not create a subscription.
  const seenBirds = useQuery('Bird').filtered('haveSeen == true');

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(seenBirds);
    });
    numSubs = realm.subscriptions.length; // :remove:
  });

  return (
    <FlatList
      data={allSubscriptions}
      keyExtractor={subscription => subscription.id.toString()}
      renderItem={({item}) => <Text>{item.name}</Text>}
    />
  );
}
// :snippet-end:
// :replace-end:

afterEach(async () => {
  await App.getApp(APP_ID).currentUser?.logOut();
});

test('Instantiate AppWrapper and test number of subscriptions', async () => {
  render(<AppWrapper />);
  await waitFor(
    () => {
      expect(numSubs).toBe(2);
    },
    {timeout: 2000},
  );
});
