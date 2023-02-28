// :replace-start: {
//   "terms": {
//     "SubscriptionRealmContext": "RealmContext"
//   }
// }
// :snippet-start: check-sub-status
import React, {useEffect} from 'react';
import {AppProvider, UserProvider} from '@realm/react';
import {Text, View} from 'react-native';
// get realm context from createRealmContext()
import {SubscriptionRealmContext} from '../RealmConfig';
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

const {RealmProvider} = SubscriptionRealmContext;

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
// :remove-end:

const {useRealm, useQuery} = SubscriptionRealmContext;

function SubscriptionManager() {
  const realm = useRealm();
  const seenBirds = useQuery('Bird').filtered('haveSeen == true');

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(seenBirds);
    });
    numSubs = realm.subscriptions.length; // :remove:
  });

  // Returns state of all subscriptions, not individual subscriptions.
  // In this case, it's just the subscription for `Bird` objects where
  // `haveSeen` is true.
  const allSubscriptionState = realm.subscriptions.state;

  return (
    <View>
      <Text>Status of all subscriptions: {allSubscriptionState}</Text>
    </View>
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
      expect(numSubs).toBe(1);
    },
    {timeout: 2000},
  );
});
