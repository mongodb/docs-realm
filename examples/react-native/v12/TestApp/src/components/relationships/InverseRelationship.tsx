import React, {useState} from 'react';
import {BSON} from 'realm';
import {useQuery, useRealm} from '@realm/react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';

import {ManufacturerInverse, CarInverse} from '../../models';

export const CreateInverseRelationship = () => {
  const [carModel, setCarModel] = useState('');
  // const [manufacturerId, setManufacturerId] = useState<BSON.ObjectId | undefined>(undefined);

  const realm = useRealm();
  const manufacturerInverse = useQuery(ManufacturerInverse)[0];
  const cars = useQuery(CarInverse);
  const manufacturerId = new BSON.ObjectID();

  // Create a manufacturer to add cars to. This is a hack to streamline
  // testing. Could also implement a UI flow to create a manufacturer, then
  // create cars.
  if (!manufacturerInverse) {
    realm.write(() => {
      realm.create(ManufacturerInverse, {
        _id: manufacturerId,
        name: 'Nissan',
        cars: [],
      });
    });
  }

  const getManufacturerId = (car: CarInverse): string => {
    const carManufacturer = car.manufacturer[0];

    return carManufacturer._id.toString();
  };

  const createRelationship = (model: string): void => {
    realm.write(() => {
      const thisCar = realm.create(CarInverse, {
        _id: new BSON.ObjectID(),
        model: model,
        miles: 1000,
      });

      manufacturerInverse.cars.push(thisCar);
    });
  };

  return (
    <View>
      <Text>Inverse Relationship</Text>
      <TextInput
        testID={'inverse-model-input'}
        onChangeText={setCarModel}
        value={carModel}
        placeholder="Car model"
        style={styles.textInput}
      />

      {cars.length ? (
        <FlatList
          data={cars}
          renderItem={({item}) => (
            <View testID="inverse-car">
              <Text testID="inverse-model">Model: {item.model}</Text>
              <Text testID="inverse-manufacturer">
                Manufacturer: {getManufacturerId(item)}
              </Text>
            </View>
          )}
          keyExtractor={item => item._id.toString()}
        />
      ) : (
        <Text>No cars found!</Text>
      )}

      <Button
        testID="create-inverse-relationship"
        title="Create inverse relationship"
        onPress={() => {
          createRelationship(carModel);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
