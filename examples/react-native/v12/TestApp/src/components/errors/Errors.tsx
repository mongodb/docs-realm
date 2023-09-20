import React, {useState} from 'react';
import Realm, {ObjectSchema, BSON} from 'realm';
import {RealmProvider, useRealm} from '@realm/react';
import {View, Text, Button, TextInput, FlatList} from 'react-native';
import {SyncWrapper} from '../realm-wrappers/SyncWrapper';

import {Person, Turtle} from '../../models';

export const Errors = () => {
  return (
    <SyncWrapper objectModels={[Person, Turtle]}>
      <View>
        <Text>test</Text>
      </View>
    </SyncWrapper>
  );
};
