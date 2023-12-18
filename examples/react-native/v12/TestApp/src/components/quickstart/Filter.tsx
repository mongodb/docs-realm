import React, {useState} from 'react';
import Realm from 'realm';
import {useRealm, useQuery} from '@realm/react';
import {Profile} from '../../models';
import {
  ScrollView,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';

export const FindSortFilter = () => {
  const realm = useRealm();
  const [profileName, setProfileName] = useState('');
  const [deleteProfileName, setDeleteThisProfile] = useState('');
  const [profileNameChange, setProfileNameChange] = useState('');
  const [filterProfileTerm, setFilterProfileTerm] = useState('');
  const searched = 'N/A';

  // Find
  const profiles = useQuery(Profile);

  // Sort
  var sorted;

  // Filter
  const filtered = profiles.filtered('name TEXT $0', 'Leafy');

  // :snippet-start: objects-create
  const addProfile = (name: string) => {
    realm.write(() => {
      realm.create('Profile', {
        name: name,
        _id: new Realm.BSON.ObjectId(),
      });
    });
  };
  // :snippet-end:

  // get profile based on supplied name
  const getProfile = (filteredName: string): Profile => {
    // filter for which profile to delete
    const deleteThisProfile = profiles.filtered('name TEXT $0', filteredName);

    return deleteThisProfile[0];
  };

  // :snippet-start: objects-delete
  const deleteProfile = (profile: Profile) => {
    realm.write(() => {
      realm.delete(profile);
    });
  };
  // :snippet-end:

  // :snippet-start: objects-modify
  const changeProfileName = (profile: Profile, newName: string) => {
    realm.write(() => {
      profile.name = newName;
    });
  };
  // :snippet-end:

  return (
    <ScrollView>
      <Text style={styles.container}>Profiles list </Text>
      <FlatList
        scrollEnabled={false}
        data={profiles}
        renderItem={({item}) => <Text>{item.name}</Text>}
        keyExtractor={item => item.name}
      />
      <TextInput
        testID={'profileNameInput'}
        onChangeText={setProfileName}
        value={profileName}
        placeholder="Profile name"
      />

      <Button
        testID="addProfileButton"
        title="Add Profile"
        onPress={() => {
          addProfile(profileName);
        }}
      />
      <Text>-------------------------------</Text>

      <TextInput
        onChangeText={setDeleteThisProfile}
        value={deleteProfileName}
        placeholder="Delete which?"
      />
      <Button
        testID="removeButton"
        title="Remove the profile"
        onPress={() => {
          const profileNameToDelete = getProfile(deleteProfileName);
          deleteProfile(profileNameToDelete);
        }}
      />

      <TextInput
        onChangeText={setProfileNameChange}
        value={profileNameChange}
        placeholder="Change name to?"
      />
      <Button
        testID="modifyButton"
        title="Change the profile name"
        onPress={() => {
          const profileToChange = getProfile(profileNameChange);
          changeProfileName(profileToChange, profileNameChange);
        }}
      />

      <Text>-------------------------------</Text>

      <TextInput
        onChangeText={setFilterProfileTerm}
        value={filterProfileTerm}
        placeholder="Search for?"
      />
      <Button
        title="Filter"
        onPress={() => {
          const searched = profiles.filtered('name TEXT $0', filterProfileTerm);
        }}
      />
      <Text> Term Found: {searched} </Text>

      <Button
        title="Sort Profiles"
        onPress={() => {
          sorted = profiles.sorted('name', false);
        }}
      />
      <Text style={styles.container}>Profiles list </Text>
      <FlatList
        scrollEnabled={false}
        data={sorted}
        renderItem={({item}) => <Text>{item.name}</Text>}
        keyExtractor={item => item.name}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    marginBottom: 5,
  },
});
