// :snippet-start: always-sync-imports
import React, {useEffect, useState} from 'react';
import {WaitForSync} from 'realm';
import {useRealm, useQuery} from '@realm/react';
import {View, Text, FlatList} from 'react-native';

import {Bird} from './models/Bird';
import {Subscription} from 'realm/dist/bundle';
// :snippet-end:

// :snippet-start: always-sync
export const AlwaysWait = () => {
  const realm = useRealm();
  // Get all local birds that have not been seen yet.
  const unSeenBirds = useQuery(Bird).filtered('haveSeen == false'); // :emphasize:
  const [unSeenBirdsSubscription, setUnseenBirdsSubscription] =
    useState<Subscription | null>();

  useEffect(() => {
    const createSubscription = async () => {
      // Add subscription with timeout.
      // If timeout expires before sync is completed, currently-downloaded
      // objects are returned and sync download continues in the background.
      await unSeenBirds.subscribe({
        behavior: WaitForSync.Always, // :emphasize:
        name: 'Always wait',
        timeout: 500, // :emphasize:
      });

      // Get the subscription...
      const subscription = realm.subscriptions.findByName('Always wait');

      // ... and set it to a stateful variable or manage it in `useEffect`.
      setUnseenBirdsSubscription(subscription);
    };

    createSubscription().catch(console.error);
  }, []);

  // ...work with the subscribed results list or modify the subscription.

  // :remove-start:
  return (
    <View>
      <Text>-------------------------------</Text>

      {unSeenBirdsSubscription?.name && (
        <Text testID="unseenbird-subscription">
          Subscription name: {unSeenBirdsSubscription?.name}
        </Text>
      )}

      <Text>Unseen birds:</Text>
      {unSeenBirds.length ? (
        <FlatList
          data={unSeenBirds}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => <Text>--- {item.name}</Text>}
        />
      ) : (
        <Text>No unseen birds</Text>
      )}

      <Text>-------------------------------</Text>
    </View>
  );
  // :remove-end:
};
// :snippet-end:
