import {Profile} from '../../models'
// :snippet-end:

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
  // :snippet-end: