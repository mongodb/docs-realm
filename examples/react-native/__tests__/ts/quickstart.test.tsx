// :snippet-start: quickstart-setup
import React, {useState} from 'react';
import {Realm, createRealmContext} from '@realm/react';
import {FlatList, Pressable, Text, View} from 'react-native';
// :remove-start:
import {render, waitFor} from '@testing-library/react-native';
let numberOfProfiles: number;
let primaryKey: Realm.BSON.UUID;
// :remove-end:

class Profile extends Realm.Object<Profile> {
  _id!: Realm.BSON.UUID;
  name!: string;

  static schema = {
    name: 'Profile',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      name: 'string',
    },
  };
}

const realmConfig: Realm.Configuration = {
  schema: [Profile],
};

const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

function AppWrapper() {
  return (
    <RealmProvider>
      <ProfileFinder />
    </RealmProvider>
  );
}
// :snippet-end:

function ProfileFinder() {
  const realm = useRealm();
  const profiles = useQuery(Profile);
  const specificProfile = useObject(Profile, primaryKey);

  const [selectedProfileId, setSelectedProfileId] = useState('');

  const addProfile = (name: string) => {
    realm.write(() => {
      realm.create('Profile', {
        name: name,
        _id: new Realm.BSON.UUID(),
      });
    });
  };

  const getProfile = () => {
    return realm.objectForPrimaryKey(
      Profile,
      new Realm.BSON.UUID(selectedProfileId),
    );
  };

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
              <Pressable onPress={setSelectedProfileId(item._id.toHexString())}>
                <Text>{item.name}</Text>
              </Pressable>
            );
          }}
        />
      </View>
      <View>{getProfile()?._id}</View>
    </View>
  );
}

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
