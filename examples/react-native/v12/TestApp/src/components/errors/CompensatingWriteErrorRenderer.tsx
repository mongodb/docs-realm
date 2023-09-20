import React, {useEffect} from 'react';
import {BSON, CompensatingWriteError, CompensatingWriteInfo} from 'realm';
import {useRealm, useQuery} from '@realm/react';
import {View, Text, Button, FlatList} from 'react-native';

import {Person, Turtle} from '../../models';

type errorsProps = {
  error: CompensatingWriteError | undefined;
  compensatingWrites: CompensatingWriteInfo[] | undefined;
};

export const CompensatingWriteErrorRenderer = ({
  error,
  compensatingWrites,
}: errorsProps) => {
  const realm = useRealm();
  const people = useQuery(Person, collection =>
    collection.filtered('age < 30'),
  );
  const turtles = useQuery(Turtle, collection =>
    collection.filtered('age > 5'),
  );

  useEffect(() => {
    const updateSubs = async () => {
      await realm.subscriptions.update(mutableSubs => {
        mutableSubs.removeAll();
        mutableSubs.add(people, {name: 'People under 30'});
        mutableSubs.add(turtles, {name: 'Turtles over 5'});
      });
    };

    updateSubs();
  }, [realm]);

  const writeWithinSubscriptions = () => {
    realm.write(() => {
      const luigi = realm.create(Person, {
        _id: new BSON.ObjectId(),
        name: 'Luigi',
        age: 20,
      });

      realm.create(Turtle, {
        _id: new BSON.ObjectId(),
        name: 'Goomba',
        owner: luigi,
        age: 6,
      });
    });
  };

  const writeOutsideSubscriptions = () => {
    realm.write(() => {
      const tom = realm.create(Person, {
        _id: new BSON.ObjectId(),
        name: 'Tom',
        age: 36,
      });
      realm.create(Turtle, {
        _id: new BSON.ObjectId(),
        name: 'Phillip',
        owner: tom,
        age: 1,
      });
    });
  };

  const removeAllObjects = () => {
    realm.write(() => {
      realm.deleteAll();
    });
  };

  return (
    <View>
      <Button
        testID="write-within-subscriptions"
        title="Write within subscriptions"
        onPress={() => {
          writeWithinSubscriptions();
        }}
      />
      <Button
        testID="write-outside-subscriptions"
        title="Write outside subscriptions"
        onPress={() => {
          writeOutsideSubscriptions();
        }}
      />
      <Button
        testID="remove-all-objects"
        title="Remove all objects"
        onPress={() => {
          removeAllObjects();
        }}
      />
      <View>
        <Text>Objects within subscriptions:</Text>
        <FlatList
          testID="people-list-container"
          data={people}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <Text testID="person">
              --- {item.name} | {item.age}
            </Text>
          )}
        />
        <FlatList
          testID="turtle-list-container"
          data={turtles}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <Text testID="turtle">
              --- {item.name} | {item.age}
            </Text>
          )}
        />
      </View>
      <View>
        <Text>Errors:</Text>
        <Text testID="error-info">
          {error?.category} | {error?.name}{' '}
        </Text>
        <Text>{error?.message}</Text>
        <FlatList
          testID="error-list-container"
          data={compensatingWrites}
          renderItem={({item}) => (
            <Text testID="compensating-write-error">
              --- {item.objectName} | {item.reason}
            </Text>
          )}
        />
      </View>
    </View>
  );
};
