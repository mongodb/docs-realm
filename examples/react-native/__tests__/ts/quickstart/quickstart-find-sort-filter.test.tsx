// :snippet-start: find-sort-filter
import React from 'react';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
// :remove-start:
import {useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {render, waitFor} from '@testing-library/react-native';
let numberOfProfiles: number;
let primaryKey: Realm.BSON.UUID;

// Define your object model
class Profile extends Realm.Object<Profile> {
  _id!: Realm.BSON.UUID;
  name!: string;

  static schema = {
    name: 'Profile',
    properties: {
      _id: 'uuid',
      name: 'string',
    },
    primaryKey: '_id',
  };
}

// Create a configuration object
const realmConfig: Realm.Configuration = {
  schema: [Profile],
};

// Create a realm context
const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

// Expose a realm
function AppWrapper() {
  return (
    <RealmProvider>
      <RestOfApp />
    </RealmProvider>
  );
}
// :remove-end:

function RestOfApp() {
  const [selectedProfileId, setSelectedProfileId] = useState(primaryKey);
  // :replace-start: {
  //    "terms": {
  //       "selectedProfileId": "primaryKey"
  //    }
  // }
  const realm = useRealm();
  // Get a collection of objects that match the `Profile` class.
  const profiles = useQuery(Profile);
  // Filter useQuery results by value of the `name` property.
  const filteredProfiles = profiles.filtered('name == "React Native"');
  // Sort useQuery results by ascending value of the `name` property.
  const sortedProfiles = profiles.sorted('name');
  // Get a single Object that matchess the `Profile` class and
  // a primaryKey.
  const activeProfile = useObject(Profile, selectedProfileId);
  // :replace-end:

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
// :snippet-end:

beforeEach(async () => {
  const realm = await Realm.open(realmConfig);
  const id = new Realm.BSON.UUID();

  realm.write(() => {
    // Create a profile object.
    realm.create('Profile', {
      name: 'TestProfile',
      _id: id,
    });
  });

  primaryKey = id;

  realm.close();
});

afterEach(async () => {
  const realm = await Realm.open(realmConfig);

  realm.write(() => {
    // Clean up. Delete all objects in the realm.
    realm.deleteAll();
  });

  numberOfProfiles = 0;

  realm.close();
});

test('Instantiate AppWrapperSync and test sync', async () => {
  render(<AppWrapper />);

  await waitFor(
    () => {
      expect(numberOfProfiles).toBe(1);
    },
    {timeout: 2000},
  );
});
