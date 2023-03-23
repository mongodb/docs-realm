import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
// get realm context from createRealmContext()
import {RealmContext} from '../RealmConfig';

const {useRealm, useQuery} = RealmContext;

function SubscriptionManager() {
  const realm = useRealm();

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects('Bird').filtered('haveSeen == true'));
    });
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
