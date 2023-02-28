// :snippet-start: remove-subscriptions-full
import React, {useEffect} from 'react';
import {AppProvider, UserProvider, createRealmContext} from '@realm/react';
// import object model
import Turtle from '../Models/Turtle';
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
  const {useRealm} = RealmContext;
  const realm = useRealm();

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Remove subscription for object type `Turtle`,
      // which we added in `initialSubscriptions`.
      mutableSubs.removeByObjectType('Turtle');
    });
    numSubs = realm.subscriptions.length; //:remove:
  });

  return (
    <></>
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
      expect(numSubs).toBe(0);
    },
    {timeout: 2000},
  );
});
