import React, {useEffect} from 'react';
// get realm context from createRealmContext()
import {RealmContext} from '../RealmConfig';
import {Text, FlatList} from 'react-native';

const {useRealm, useQuery} = RealmContext;

function SubscriptionManager() {
  const realm = useRealm();

  // Pass object model to useQuery and filter results.
  // This does not create a subscription.
  const seenBirds = useQuery('Bird').filtered('haveSeen == true');

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(seenBirds, {name:'seenBirds'});
    });
  });

  return (
    <FlatList
      data={seenBirds}
      keyExtractor={bird => bird._id.toString()}
      renderItem={({item}) => <Text>{item._id}</Text>}
    />
  );
}
