import React, {useState, useEffect} from 'react';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';

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
      <FindSortFilterComponent />
    </RealmProvider>
  );
}

function FindSortFilterComponent(activeProfileId: Realm.BSON.UUID) {
  const [activeProfile, setActiveProfile] = useState<Profile>();
  const [allProfiles, setAllProfiles] = useState<Realm.Results<Profile>>();

  useEffect(() => {
    const currentlyActiveProfile: Profile & Realm.Object = useObject(Profile, activeProfileId);

    setActiveProfile(currentlyActiveProfile);
  }, [activeProfileId]);
  
  const sortProfiles = (reversed: true | false) => {
    const sorted =
      useQuery(Profile).sorted('name', reversed);

    setAllProfiles(sorted);
  };

  const filterProfiles = (filter: 'BEGINSWITH' | 'ENDSWITH') => {
    const filtered =
      useQuery(Profile).filtered(`name ${filter}[c] "t"`);

    setAllProfiles(filtered);
  };

  // ... rest of component
}
