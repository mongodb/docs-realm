import React, {useState} from 'react';
import Realm, {ObjectSchema, BSON} from 'realm';
import {RealmProvider, useRealm} from '@realm/react';
import {View, Text, Button, TextInput, FlatList} from 'react-native';
import {SyncWrapper} from '../realm-wrappers/SyncWrapper';

// TODO: Import models

export const Errors = () => {
  return (
    <SyncWrapper>
      <View>
        <Text>test</Text>
      </View>
    </SyncWrapper>
  );
};
