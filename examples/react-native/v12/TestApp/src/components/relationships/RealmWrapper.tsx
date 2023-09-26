import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RealmProvider} from '@realm/react';

import {CreateToOneRelationship} from './ToOneRelationship';
import {CreateToManyRelationship} from './ToManyRelationship';

import {
  Manufacturer,
  ToOneManufacturer,
  ToManyManufacturer,
  Car,
  LinkedCar,
  CarWithEmbed,
  Warranty,
} from '../../models';

export const RelationshipExamples = () => {
  return (
    <RealmProvider
      schema={[
        Manufacturer,
        ToOneManufacturer,
        ToManyManufacturer,
        Car,
        LinkedCar,
        CarWithEmbed,
        Warranty,
      ]}
      path="realm/ToOneRelationship">
      <View style={styles.separator}>
        <CreateToOneRelationship />
      </View>
      <View style={styles.separator}>
        <CreateToManyRelationship />
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
