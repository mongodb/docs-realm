import React, {useState} from 'react';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import {useRealm, useQuery} from '@realm/react';

import {Profile} from '../../models';
import {Button} from '../utility-components/Button';

export const Update = () => {
  const realm = useRealm();
  const profiles = useQuery(Profile);
  const [profileToUpdate, setProfileToUpdate] = useState('');
  const [newProfileName, setNewProfileName] = useState('');

  const updateProfile = () => {
    const toUpdate = realm
      .objects(Profile)
      .filtered('name == $0', profileToUpdate);

    realm.write(() => {
      toUpdate[0].name = newProfileName;
    });
  };

  return (
    <View>
      <Text style={styles.heading}>Update</Text>

      {profiles.length ? (
        <View>
          <Text>Profiles: </Text>
          <FlatList
            scrollEnabled={false}
            data={profiles}
            horizontal={true}
            renderItem={({item}) => (
              <ProfileItem
                profile={item.name}
                profileToUpdate={profileToUpdate}
                setProfileToUpdate={setProfileToUpdate}
              />
            )}
            keyExtractor={item => item.name}
          />
        </View>
      ) : (
        <Text>🛑 No profiles found</Text>
      )}

      {profileToUpdate && (
        <TextInput
          style={styles.textInput}
          onChangeText={setNewProfileName}
          value={newProfileName}
          placeholder="New profile name..."
        />
      )}

      <Button
        title="Update profile"
        onPress={updateProfile}
      />
    </View>
  );
};

interface ProfileTypes {
  profile: string;
  profileToUpdate: string;
  setProfileToUpdate: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileItem = ({
  profile,
  profileToUpdate,
  setProfileToUpdate,
}: ProfileTypes) => {
  return (
    <Pressable
      style={[
        profileToUpdate == profile ? styles.selected : null,
        styles.profileItem,
      ]}
      onPress={() => {
        setProfileToUpdate(profile);
      }}>
      <Text style={styles.profileName}>{profile}</Text>
    </Pressable>
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
  profileItem: {
    borderWidth: 1,
    borderRadius: 8,
    maxWidth: 150,
    marginHorizontal: 4,
  },
  profileName: {
    textAlign: 'center',
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
  selected: {
    backgroundColor: 'green',
  },
});
