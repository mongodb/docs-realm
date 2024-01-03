import React, {useState} from 'react';
import {FlatList, Text, TextInput, View, StyleSheet} from 'react-native';
import {useQuery} from '@realm/react';

import {Profile} from '../../models';
import {Button} from '../utility-components/Button';

export const Read = () => {
  const profiles = useQuery(Profile);

  const [searchTerm, setSearchTerm] = useState('');
  const [mutatedProfiles, setMutatedProfiles] = useState(profiles);

  const sortProfiles = (reversed: boolean) => {
    const sortedProfiles = profiles.sorted('name', reversed);

    setMutatedProfiles(sortedProfiles);
  };

  const filterProfiles = () => {
    const filteredProfiles = profiles.filtered('name TEXT $0', searchTerm);

    setMutatedProfiles(filteredProfiles);
  };

  return (
    <View>
      <Text style={styles.heading}>Read</Text>
      {mutatedProfiles.length ? (
        <View>
          <Text>Profiles: </Text>
          <FlatList
            scrollEnabled={false}
            data={mutatedProfiles}
            renderItem={({item}) => <Text> • {item.name}</Text>}
            keyExtractor={item => item.name}
          />
        </View>
      ) : (
        <Text>🛑 No profiles found</Text>
      )}

      <View style={styles.buttonGroup}>
        <Button
          title={'Sort alphabetically'}
          onPress={() => {
            sortProfiles(false);
          }}
        />

        <Button
          title={'Sort in reverse'}
          onPress={() => {
            sortProfiles(true);
          }}
        />
      </View>

      <TextInput
        style={styles.textInput}
        onChangeText={setSearchTerm}
        value={searchTerm}
        placeholder="Search profiles..."
      />

      <View style={styles.buttonGroup}>
        <Button
          title="Filter"
          onPress={filterProfiles}
        />
        <Button
          title="Clear filter"
          onPress={() => {
            setMutatedProfiles(profiles);
          }}
        />
      </View>
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
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
