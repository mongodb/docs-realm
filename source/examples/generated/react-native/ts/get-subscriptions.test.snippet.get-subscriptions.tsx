import React, {useEffect} from 'react';
import {AppProvider, UserProvider} from '@realm/react';
// get realm context from createRealmContext()
import {RealmContext} from '../RealmConfig';
import {Text, FlatList} from 'react-native';

const {useRealm, useQuery} = RealmContext;

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
  });

  return (
    <FlatList
      data={allSubscriptions}
      keyExtractor={subscription => subscription.id.toString()}
      renderItem={({item}) => <Text>{item.name}</Text>}
    />
  );
}
