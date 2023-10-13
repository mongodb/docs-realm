import React from 'react';
import Realm, {ObjectSchema} from 'realm';
import {createRealmContext} from '@realm/react';
import {useRealm, useQuery, useObject, useState} from 'react';
import {FlatList, Pressable, Text, View, Button} from 'react-native';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {Profile} from '../../models';

export const FindSortFilter = () => {
  // Find
  const profiles = useQuery(Profile);

  // Sort
  const sorted = profiles.sorted('name', false);

  // Filter
  const filtered = profiles.filtered('name TEXT $0', 'Leafy');

  return (
    <View>
      <Text>-------------------------------</Text>
    </View>
  );
};
