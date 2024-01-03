import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {BSON} from 'realm';
import {useRealm} from '@realm/react';

import {Profile} from '../../models';
import {Button} from '../utility-components/Button';

export const Create = () => {
  const realm = useRealm();
  const [profileName, setProfileName] = useState('');

  const addProfile = () => {
    realm.write(() => {
      realm.create(Profile, {
        _id: new BSON.ObjectId(),
        name: profileName,
      });
    });
  };

  return (
    <View>
      <Text style={styles.heading}>Create</Text>

      <TextInput
        style={styles.textInput}
        onChangeText={setProfileName}
        value={profileName}
        placeholder="Profile name..."
      />

      <Button
        title="Add Profile"
        onPress={addProfile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
  },
  textInput: {
    marginVertical: 8,
    backgroundColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
