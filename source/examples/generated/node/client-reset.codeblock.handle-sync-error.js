async function handleSyncError(_session, error) {
  if (error.name === "ClientReset") {
    const realmPath = realm.path; // realm.path will no be accessible after realm.close()
    realm.close(); // you must close all realms before proceeding

    // pass your realm app instance, and realm path to initiateClientReset()
    Realm.App.Sync.initiateClientReset(app, realmPath);

    realm = await Realm.open(config);
    const oldRealm = await Realm.open(error.config);

    const lastSyncedTime = lastSyncedRealm.objectForPrimaryKey(
      "LastSynced",
      "Dog"
    ).timestamp;
    const unsyncedDogs = realm
      .objects("Dog")
      .filtered(`lastUpdated > ${lastSyncedTime}`);
    realm.write(() => {
      unsyncedDogs.forEach((dog) => {
        realm.create("Dog", dog, "modified");
      });
    });
    await realm.syncSession.uploadAllLocalChanges();
    oldRealm.close();
  } else {
    console.log(`Received error ${error.message}`);
  }
}
