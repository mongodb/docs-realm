import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RealmProvider} from '@realm/react';

import {CreateToOneRelationship} from './ToOneRelationship';
import {CreateToManyRelationship} from './ToManyRelationship';
import {EmbeddedRelationship} from './EmbeddedRelationship';

import {
  Manufacturer,
  ManufacturerInverse,
  ToOneManufacturer,
  ToManyManufacturer,
  Car,
  CarInverse,
  LinkedCar,
  CarWithEmbed,
  Warranty,
} from '../../models';

const realmModels: Realm.RealmObjectConstructor[] = [
  Manufacturer,
  ToOneManufacturer,
  ToManyManufacturer,
  ManufacturerInverse,
  Car,
  CarInverse,
  LinkedCar,
  CarWithEmbed,
  Warranty,
];

export const RelationshipExamples = () => {
  return (
    <RealmProvider schema={realmModels} path="relationships.realm">
      <View style={styles.separator}>
        <CreateToOneRelationship />
      </View>
      <View style={styles.separator}>
        <CreateToManyRelationship />
      </View>
      <View style={styles.separator}>
        <EmbeddedRelationship />
      </View>
    </RealmProvider>
  );
};

const styles = StyleSheet.create({
  separator: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
