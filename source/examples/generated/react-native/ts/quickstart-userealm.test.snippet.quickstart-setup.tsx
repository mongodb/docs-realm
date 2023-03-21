import React from 'react';
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
const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

// Expose a realm
function AppWrapper() {
  return (
    <RealmProvider>
      <RestOfApp objectPrimaryKey={[primaryKey]} />
    </RealmProvider>
  );
}

type RestOfAppProps = {
  objectPrimaryKey: Realm.BSON.ObjectId;
};

const RestOfApp: React.FC<RestOfAppProps> = ({objectPrimaryKey}) => {
  const [selectedProfileId, setSelectedProfileId] = useState(objectPrimaryKey);
  const realm = useRealm();

  const changeProfileName = (profile: Profile, newName: string) => {
    realm.write(() => {
      profile.name = newName;
    });
  };

  // ... rest of component

