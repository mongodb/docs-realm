import React, {useState} from 'react';
import {BSON} from 'realm';
import {useQuery, useRealm} from '@realm/react';
import {View, Text, TextInput, Button} from 'react-native';

import {ToOneManufacturer, Car} from '../../models';

export const CreateToOneRelationship = () => {
  const [carModel, setCarModel] = useState('');

  const realm = useRealm();
  const toOneManufacturer = useQuery(ToOneManufacturer)[0];

  const createRelationship = (model: string) => {
    realm.write(() => {
      const thisCar = realm.create(Car, {
        _id: new BSON.ObjectID(),
        model: model,
        miles: 1000,
      });

      realm.create(ToOneManufacturer, {
        _id: new BSON.ObjectID(),
        name: 'Nissan',
        car: thisCar,
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
      <Text>To-One Relationship</Text>
      <TextInput
        testID={'to-one-input'}
        onChangeText={setCarModel}
        value={carModel}
      />

      {toOneManufacturer && toOneManufacturer.car && (
        <Text testID="car-model">
          Manufacturer car: {toOneManufacturer.car.model}
        </Text>
      )}

      <Button
        testID="create-to-one-relationship"
        title="Create to-one relationship"
        onPress={() => {
          createRelationship(carModel);
        }}
      />
      <Button
        testID="remove-all-objects"
        title="Remove all objects"
        onPress={() => {
          removeAllObjects();
        }}
      />
    </View>
  );
};
