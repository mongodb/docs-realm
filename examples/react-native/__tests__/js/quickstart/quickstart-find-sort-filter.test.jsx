// :snippet-start: find-sort-filter
import React, {useState} from 'react';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
// :remove-start:
import {Button} from 'react-native';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
let higherOrderProfileName;
let primaryKey;
// :remove-end:

// Define your object model
class Profile extends Realm.Object {
  static schema = {
    name: 'Profile',
    properties: {
      _id: 'objectId',
      name: 'string',
    },
    primaryKey: '_id',
  };
}

// Create a configuration object
const realmConfig = {
  schema: [Profile],
};

// Create a realm context
const {RealmProvider, useObject, useQuery} = createRealmContext(realmConfig);

// Expose a realm
function AppWrapper() {
  return (
    <RealmProvider>
      <FindSortFilterComponent />
    </RealmProvider>
  );
}

const FindSortFilterComponent = () => {
  const [activeProfile, setActiveProfile] = useState();
  const [allProfiles, setAllProfiles] = useState();
  // :replace-start: {
  //    "terms": {
  //       "primaryKey": "[primaryKey]"
  //    }
  // }
  const currentlyActiveProfile = useObject(Profile, primaryKey);
  // :replace-end:
  const profiles = useQuery(Profile);

  const sortProfiles = (reversed) => {
    const sorted = profiles.sorted('name', reversed);

    setAllProfiles(sorted);
  };

  const filterProfiles = (filter, letter) => {
    // Use [c] for case-insensitivity.
    const filtered = profiles.filtered(`name ${filter}[c] "${letter}"`);

    setAllProfiles(filtered);
    // For testing only. Ensures filtering works. // :remove:
    higherOrderProfileName = filtered[0].name; // :remove:
  };

  // ... rest of component
  // :remove-start:
  return (
    <Button
      onPress={() => {
        filterProfiles('BEGINSWITH', 's');
      }}
      testID='test-change-name'
      title='Filter profiles'
    />
  );
  // :remove-end:
};
// :snippet-end:

beforeEach(async () => {
  const realm = await Realm.open(realmConfig);
  const id = new Realm.BSON.ObjectId();

  realm.write(() => {
    // Create a profile object.
    realm.create('Profile', {
      name: 'TestProfile',
      _id: id,
    });

    realm.create('Profile', {
      name: 'SecondProfile',
      _id: new Realm.BSON.ObjectId(),
    });
  });

  primaryKey = id;
  higherOrderProfileName = 'TestProfile';

  realm.close();
});

afterEach(async () => {
  const realm = await Realm.open(realmConfig);

  realm.write(() => {
    // Clean up. Delete all objects in the realm.
    realm.deleteAll();
  });

  realm.close();
});

test('Instantiate AppWrapperSync and change object name', async () => {
  const {findByTestId} = render(<AppWrapper />);
  const button = await findByTestId('test-change-name');

  fireEvent.press(button);

  await waitFor(
    () => {
      expect(higherOrderProfileName).toBe('SecondProfile');
    },
    {timeout: 2000},
  );
});
