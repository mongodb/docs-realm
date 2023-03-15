import React from 'react';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';

function RestOfApp() {
  const [selectedProfileId, setSelectedProfileId] = useState(primaryKey);
  const realm = useRealm();
  // Get a collection of objects that match the `Profile` class.
  const profiles = useQuery(Profile);
  // Filter useQuery results by value of the `name` property.
  const filteredProfiles = profiles.filtered('name == "React Native"');
  // Sort useQuery results by ascending value of the `name` property.
  const sortedProfiles = profiles.sorted('name');
  // Get a single Object that matchess the `Profile` class and
  // a primaryKey.
  const activeProfile = useObject(Profile, primaryKey);

  // Check profile length to confirm this is the same sync realm as
  // that set up in beforeEach(). Then set numberOfProfiles to the length.
  if (profiles.length) {
    numberOfProfiles = profiles.length;
  }

  return (
    <View>
      <View>
        <Text>Select a profile to view details</Text>
        <FlatList
          data={profiles.sorted('name')}
          keyExtractor={item => item._id.toHexString()}
          renderItem={({item}) => {
            return (
              <Pressable onPress={setSelectedProfileId(item._id)}>
                <Text>{item.name}</Text>
              </Pressable>
            );
          }}
        />
      </View>
      <Text>{activeProfile?._id.toHexString()}</Text>
    </View>
  );
}
