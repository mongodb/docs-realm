import React, {useEffect} from 'react';
// get realm context from createRealmContext()
import {RealmContext} from '../RealmConfig';
import {Text, FlatList} from 'react-native';

const {useRealm} = RealmContext;

function SubscriptionManager() {
  const realm = useRealm();
  const seenBirds = realm.objects('Bird').filtered('haveSeen == true');

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      // Create subscription query
      const seenBirdsSubQuery = realm
        .objects('Bird')
        .filtered('haveSeen == true');

      // Create subscription for filtered results.
      mutableSubs.add(seenBirdsSubQuery, {name: 'seenBirds'});
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
