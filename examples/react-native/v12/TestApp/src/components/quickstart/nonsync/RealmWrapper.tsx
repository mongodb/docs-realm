import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {RealmProvider} from '@realm/react';

import {Profile} from '../../../models';
import {Create} from '../Create';
import {Read} from '../Read';
import {Update} from '../Update';
import {Delete} from '../Delete';

export const Quickstart = () => {
  return (
    <RealmProvider schema={[Profile]}>
      <ScrollView>
        <View style={styles.separator}>
          <Read />
        </View>
        <View style={styles.separator}>
          <Create />
        </View>
        <View style={styles.separator}>
          <Update />
        </View>
        <View style={styles.separator}>
          <Delete />
        </View>
      </ScrollView>
    </RealmProvider>
  );
};

const styles = StyleSheet.create({
  separator: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
