// :snippet-start: quickstart-setup
import React from 'react';
import Realm from 'realm';
// :snippet-start: setup-import-hooks
import {AppProvider, UserProvider, createRealmContext} from '@realm/react';
// :snippet-end:
// :remove-start:
import {useState} from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {render, waitFor} from '@testing-library/react-native';
let numberOfProfiles: number;
let primaryKey: Realm.BSON.UUID;
// :remove-end:

// :snippet-start: setup-define-model
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
// :snippet-end:

// :snippet-start: configure-config-object
const realmConfig: Realm.Configuration = {
  schema: [Profile],
};
// :snippet-end:
// :snippet-start: configure-realm-context
const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);
// :snippet-end:

// :snippet-start: configure-expose-realm
function AppWrapper() {
  return (
    <RealmProvider>
      <RestOfApp />
    </RealmProvider>
  );
}
// :snippet-end:
// :snippet-end:

function RestOfApp() {
  const [selectedProfileId, setSelectedProfileId] = useState(primaryKey);
  // :snippet-start: objects-crud
  // :replace-start: {
  //    "terms": {
  //       "selectedProfileId": "primaryKey"
  //    }
  // }
  const realm = useRealm();
  // :snippet-start: objects-find
  const profiles = useQuery(Profile);
  const activeProfile = useObject(Profile, selectedProfileId);
  // :snippet-end:

  const addProfile = (name: string) => {
    realm.write(() => {
      realm.create('Profile', {
        name: name,
        _id: new Realm.BSON.UUID(),
      });
    });
  };

  const changeProfileName = (newName: string) => {
    realm.write(() => {
      activeProfile!.name = newName;
    });
  };

  const deleteProfile = () => {
    realm.write(() => {
      realm.delete(activeProfile);
    });
  };
  // :replace-end:
  // :snippet-end:

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
