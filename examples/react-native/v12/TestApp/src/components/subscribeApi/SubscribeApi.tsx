import React, {useEffect, useState} from 'react';
import {BSON, WaitForSync} from 'realm';
import {useRealm, useQuery} from '@realm/react';
import {View, Text, Button, TextInput, FlatList} from 'react-native';

import {Bird} from './models/Bird';
import {Subscription} from 'realm/dist/bundle';

// :snippet-start: subscribe-query
export const SeenBirdsManager = () => {
  const realm = useRealm();
  const [birdName, setBirdName] = useState('Change me!');
  // Get local birds that have been marked as "haveSeen".
  const seenBirds = useQuery(Bird).filtered('haveSeen == true');
  const [seenBirdsSubscription, setSeenBirdsSubscription] =
    useState<Subscription | null>();

  useEffect(() => {
    const createSubscription = async () => {
      // Only wait for sync to finish on the initial sync.
      await seenBirds.subscribe({
        behavior: WaitForSync.FirstTime,
        name: 'First time sync only',
      });

      const subscription = realm.subscriptions.findByName(
        'First time sync only',
      );

      setSeenBirdsSubscription(subscription);
    };

    createSubscription().catch(console.error);
  }, []);

  useEffect(() => {}, [seenBirds]);

  // ...work with the subscribed results list or modify the subscription.

  // :remove-start:

  const writeRealmObject = async (name: string) => {
    realm.write(() => {
      realm.create(Bird, {
        _id: new BSON.ObjectId(),
        name: name,
        haveSeen: true,
      });
    });
  };

  const clearRealm = async () => {
    realm.write(() => {
      realm.deleteAll();
    });

    await realm.syncSession?.uploadAllLocalChanges();
  };

  return (
    <View>
      {seenBirdsSubscription?.name && (
        <Text testID="seenbird-subscription">
          Subscription name: {seenBirdsSubscription?.name}
        </Text>
      )}

      <TextInput onChangeText={setBirdName} value={birdName} />

      <Button
        testID="add-bird"
        title="Add Seen Bird"
        onPress={() => {
          writeRealmObject(birdName);
        }}
      />
      <Button
        title="Remove all birds"
        onPress={() => {
          clearRealm();
        }}
      />

      <Text>Seen birds:</Text>
      {seenBirds.length ? (
        <FlatList
          data={seenBirds}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => <Text>--- {item.name}</Text>}
        />
      ) : (
        <Text>No birds seen</Text>
      )}
    </View>
  );
  // :remove-end:
};
// :snippet-end:

// :snippet-start: always-sync
export const UnseenBirdsManager = () => {
  const realm = useRealm();
  // Get all local birds that have not been seen yet.
  const unSeenBirds = useQuery(Bird).filtered('haveSeen != true');
  const [unSeenBirdsSubscription, setUnseenBirdsSubscription] =
    useState<Subscription | null>();

  useEffect(() => {
    const createSubscription = async () => {
      // Add subscription with timeout.
      // If timeout expires before sync is completed, currently-downloaded
      // objects are returned and sync download continues in the background.
      await unSeenBirds.subscribe({
        behavior: WaitForSync.Always,
        name: 'Always wait',
        timeout: 500,
      });

      const subscription = realm.subscriptions.findByName('Always wait');

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
    </View>
  );
  // :remove-end:
};
// :snippet-end:

// // :snippet-start: subscribe-query
export const BlueBirdManager = () => {
  const realm = useRealm();
  const birds = useQuery(Bird);
  const [birdsSubscription, setBirdsSubscription] =
    useState<Subscription | null>();

  useEffect(() => {
    const getSubscription = async () => {
      const subscription = realm.subscriptions.findByName('Initial birds');

      setBirdsSubscription(subscription);
    };

    getSubscription().catch(console.error);
  }, []);

  // ...work with the subscribed results list or modify the subscription.

  // :remove-start:
  const unsubscribeFromQuery = () => {
    birds.unsubscribe();

    setBirdsSubscription(realm.subscriptions.findByName('Initial birds'));
  };

  return (
    <View>
      <Text>-------------------------------</Text>

      <Text testID="bird-subscription">
        Subscription name: {birdsSubscription?.name}
      </Text>

      <Button
        testID="unsubscribe"
        title="Unsubscribe"
        onPress={() => {
          unsubscribeFromQuery();
        }}
      />
    </View>
  );
  // :remove-end:
};
// // :snippet-end:
