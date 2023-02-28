import React, {useEffect} from 'react';
import {AppProvider, UserProvider, createRealmContext} from '@realm/react';
// import object model
import Turtle from '../Models/Turtle';
import Bird from '../Models/Bird';
import {Text, FlatList} from 'react-native';

const config = {
  // Pass in imported object models
  schema: [Turtle, Bird],
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
  const {useRealm, useQuery} = RealmContext;
  const realm = useRealm();

  // Returns a subscription set that contains all subscriptions.
  const allSubscriptions = realm.subscriptions;

  // Pass object model to useQuery and filter results.
  // This does not create a subscription.
  const seenBirds = useQuery(Bird).filtered('haveSeen == true');

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(seenBirds);
    });
  });

  return (
    <FlatList
      data={allSubscriptions}
      keyExtractor={subscription => subscription.id.toString()}
      renderItem={({item}) => <Text>{item.name}</Text>}
    />
  );
}
