import React, {useState} from 'react';
import {Text, FlatList, View, StyleSheet, Pressable} from 'react-native';
import {useRealm, useQuery} from '@realm/react';

import {Profile} from '../../models';
import {Button} from '../utility-components/Button';

export const Delete = () => {
  const realm = useRealm();
  const profiles = useQuery(Profile);
  const [profileToDelete, setProfileToDelete] = useState('');

  const deleteProfile = () => {
    const toDelete = realm
      .objects(Profile)
      .filtered('name == $0', profileToDelete);

    realm.write(() => {
      realm.delete(toDelete);
    });
  };

  return (
    <View>
      <Text style={styles.heading}>Delete</Text>

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
                profileToDelete={profileToDelete}
                setProfileToDelete={setProfileToDelete}
              />
            )}
            keyExtractor={item => item.name}
          />
        </View>
      ) : (
        <Text>🛑 No profiles found</Text>
      )}

      <Button
        title="Delete profile"
        onPress={deleteProfile}
      />
    </View>
  );
};

interface ProfileTypes {
  profile: string;
  profileToDelete: string;
  setProfileToDelete: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileItem = ({
  profile,
  profileToDelete,
  setProfileToDelete,
}: ProfileTypes) => {
  return (
    <Pressable
      style={[
        profileToDelete == profile ? styles.selected : null,
        styles.profileItem,
      ]}
      onPress={() => {
        setProfileToDelete(profile);
      }}>
      <Text style={styles.profileName}>{profile}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
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
