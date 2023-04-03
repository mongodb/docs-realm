import React, {useState} from 'react';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';

// Define your object model
class Profile extends Realm.Object<Profile> {
  _id!: Realm.BSON.ObjectId;
  name!: string;

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
const realmConfig: Realm.Configuration = {
  schema: [Profile],
};

// Create a realm context
const {RealmProvider, useObject, useQuery} = createRealmContext(realmConfig);

// Expose a realm
function AppWrapper() {
  return (
    <RealmProvider>
      <FindSortFilterComponent objectPrimaryKey={YOUR_PRIMARY_KEY} />
    </RealmProvider>
  );
}

type FindSortFilterComponentProps = {
  objectPrimaryKey: Realm.BSON.ObjectId;
};

const FindSortFilterComponent = ({objectPrimaryKey}: FindSortFilterComponentProps) => {
  const [activeProfile, setActiveProfile] = useState<Profile>();
  const [allProfiles, setAllProfiles] = useState<Realm.Results<Profile>>();
  const currentlyActiveProfile = useObject(Profile, objectPrimaryKey);
  const profiles = useQuery(Profile);

  const sortProfiles = (reversed: true | false) => {
    const sorted = profiles.sorted('name', reversed);

    setAllProfiles(sorted);
  };

  const filterProfiles = (filter: 'BEGINSWITH' | 'ENDSWITH', letter: string) => {
    // Use [c] for case-insensitivity.
    const filtered = profiles.filtered(`name ${filter}[c] "${letter}"`);

    setAllProfiles(filtered);
  };

  // ... rest of component
};
