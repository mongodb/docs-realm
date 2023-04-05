import React, {useEffect} from 'react';
import Realm from 'realm';
import {useUser, useApp, AppProvider, UserProvider} from '@realm/react';

function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={<LogIn />}>
        <NotificationSetter />
      </UserProvider>
    </AppProvider>
  );
}

function NotificationSetter() {
  // Get currently logged in user
  const user = useUser();

  useEffect(() => {
    const plants = user!
      .mongoClient('mongodb-atlas')
      .db('example')
      .collection<Plant>('plants');

    // Set up notifications
    watchForAllChanges(plants);
  }, [user, watchForAllChanges]);

  const watchForAllChanges = async (
    plants: Realm.Services.MongoDB.MongoDBCollection<Plant>,
  ) => {
    // Watch for changes to the plants collection
    for await (const change of plants.watch()) {
      switch (change.operationType) {
        case 'insert': {
          const {documentKey, fullDocument} = change;
          console.log(`new document: ${JSON.stringify(
            documentKey,
            null,
            2,
          )}`, fullDocument);
          break;
        }
        case 'update': {
          const {documentKey, fullDocument} = change;
          console.log(`updated document: $${JSON.stringify(
            documentKey,
            null,
            2,
          )}`, fullDocument);
          break;
        }
        case 'replace': {
          const {documentKey, fullDocument} = change;
          console.log(`replaced document: ${JSON.stringify(
            documentKey,
            null,
            2,
          )}`, fullDocument);
          break;
        }
        case 'delete': {
          const {documentKey} = change;
          console.log(`deleted document: ${JSON.stringify(
              documentKey,
              null,
              2,
            )}`);
          break;
        }
      }
    }
  };

  // ... rest of component

}
