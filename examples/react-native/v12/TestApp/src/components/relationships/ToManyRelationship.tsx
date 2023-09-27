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

import {ToManyManufacturer, LinkedCar} from '../../models';

export const CreateToManyRelationship = () => {
  const [carModel, setCarModel] = useState('');

  const realm = useRealm();
  const toManyManufacturer = useQuery(ToManyManufacturer)[0];
  const cars = useQuery(LinkedCar);

  // Create a manufacturer to add cars to. This is a hack to streamline
  // testing. Could also implement a UI flow to create a manufacturer, then
  // create cars.
  if (!toManyManufacturer) {
    realm.write(() => {
      realm.create(ToManyManufacturer, {
        _id: new BSON.ObjectID(),
        name: 'Nissan',
        cars: [],
      });
    });
  }

  const getLinkedManufacturer = (car: LinkedCar) => {
    const manufacturer = car.linkingObjects<ToManyManufacturer>(
      'ToManyManufacturer',
      'cars',
    )[0];

    return manufacturer.name;
  };

  const createRelationship = (model: string) => {
    realm.write(() => {
      const thisCar = realm.create(LinkedCar, {
        _id: new BSON.ObjectID(),
        model: model,
        miles: 1000,
      });

      toManyManufacturer.cars.push(thisCar);
    });
  };

  return (
    <View>
      <Text>To-Many Relationship</Text>
      <TextInput
        testID={'to-many-model-input'}
        onChangeText={setCarModel}
        value={carModel}
        placeholder="Car model"
        style={styles.textInput}
      />

      {cars.length ? (
        <FlatList
          data={cars}
          renderItem={({item}) => (
            <View testID="car">
              <Text testID="model">Model: {item.model}</Text>
              <Text testID="manufacturer">
                Manufacturer: {getLinkedManufacturer(item)}
              </Text>
            </View>
          )}
          keyExtractor={item => item._id.toString()}
        />
      ) : (
        <Text>No cars found!</Text>
      )}

      <Button
        testID="create-to-many-relationship"
        title="Create to-many relationship"
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
