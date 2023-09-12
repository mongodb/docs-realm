import React, {useEffect, useState} from 'react';
import Realm, {BSON, WaitForSync} from 'realm';
import {useRealm, useQuery} from '@realm/react';
import {View, Text, Button, TextInput, FlatList} from 'react-native';

import {Bird} from './models/Bird';

// :snippet-start: subscribe-query
export const SeenBirdsManager = () => {
  const realm = useRealm();
  const [birdName, setBirdName] = useState('Change me!');
  // Get local birds that have been marked as "haveSeen".
  const seenBirds = useQuery(Bird).filtered('haveSeen == true');

  useEffect(() => {
    // Only wait for sync to finish on the initial sync.
    seenBirds.subscribe({
      behavior: WaitForSync.FirstTime,
      name: 'First time sync only',
    });
  }, [seenBirds]);

  // ...work with the subscribed results list or modify the subscription.

  // :remove-start:
  let seenBirdsSubscription = realm.subscriptions.findByName(
    'First time sync only',
  );

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

  const unsubscribeFromQuery = () => {
    // TODO: Figure out how to include this in the example
    // Defer talking about when to use this for an
    // optimizations page
    seenBirds.unsubscribe();

    seenBirdsSubscription = realm.subscriptions.findByName(
      'First time sync only',
    );
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
      <Button
        testID="unsubscribe"
        title="Unsubscribe"
        onPress={() => {
          unsubscribeFromQuery();
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

  useEffect(() => {
    // Add subscription with timeout
    // If timeout expires before sync is completed, currently-downloaded
    // objects are returned and sync download continues in the background.
    unSeenBirds.subscribe({
      behavior: WaitForSync.Always,
      name: 'Always wait',
      timeout: 500,
    });
  }, []);

  // ...work with the subscribed results list or modify the subscription.

  // :remove-start:

  const unSeenBirdsSubscription = realm.subscriptions.findByName('Always sync');

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
// function BlueBirdManager() {
//   const realm = useRealm();

//   // Get all local objects with the name of 'Bluebird'.
//   const blueBirds = useQuery(Bird).filtered("name == 'Bluebird'");

//   useEffect(() => {
//     // Subscribe to the blueBirds query.
//     blueBirds.subscribe({name: 'All bluebirds'});
//   }, []);

//   const blueBirdSubscription = realm.subscriptions.findByName('All bluebirds');

//   // ...work with the subscribed results list or modify the subscription.

//   // :remove-start:
//   return (
//     <View>
//       <Text>-------------------------------</Text>

//       <Text testID="bluebird-subscription">
//         Subscription name: {blueBirdSubscription?.name}
//       </Text>
//     </View>
//   );
//   // :remove-end:
// }
// // :snippet-end:
