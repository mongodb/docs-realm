import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RealmProvider} from '@realm/react';

import {CreateToOneRelationship} from './ToOneRelationship';
import {CreateToManyRelationship} from './ToManyRelationship';
import {EmbeddedRelationship} from './EmbeddedRelationship';

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
      path="relationships.realm">
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
