import React from 'react';
import {AppProvider, UserProvider, createRealmContext} from '@realm/react';
// import object model
import Turtle from '../Models/Turtle';
import {Text, FlatList} from 'react-native';

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
