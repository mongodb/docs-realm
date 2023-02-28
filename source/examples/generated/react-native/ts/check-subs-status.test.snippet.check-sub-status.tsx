import React, {useEffect} from 'react';
import {AppProvider, UserProvider, createRealmContext} from '@realm/react';
// import object model
import Turtle from '../Models/Turtle';
import {Text, View} from 'react-native';

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

  // Returns state of all subscriptions, not individual subscriptions.
  // In this case, it's just the subscription for `Turtle` objects.
  const allSubscriptionState = realm.subscriptions.state;

  return (
    <View>
      <Text>Status of all subscriptions: {allSubscriptionState}</Text>
    </View>
  );
}
