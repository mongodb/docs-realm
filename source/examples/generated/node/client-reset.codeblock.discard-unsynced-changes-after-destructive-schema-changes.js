// Once you have opened your Realm, you will have to keep a reference to it.
// In the error handler, this reference is called `realm`
async function handleSyncError(session, syncError) {
  if (syncError.name == "ClientReset") {
    const path = realm.path; // realm.path will no be accessible after realm.close()
    realm.close();
    // TODO: do i need this here now that it's deprecated?
    Realm.App.Sync.initiateClientReset(app, path);

    // Download Realm from the server.
    // Ensure that the backend state is fully downloaded before proceeding,
    // which is the default behavior.
    realm = await Realm.open(config);
    realm.close();
  }
}

const config = {
  schema: [DogSchema],
  sync: {
    user: app.currentUser,
    partitionValue: "MyPartitionValue",
    clientReset: {
      mode: "discardLocal",
      clientResyncBefore: (realm) => {
        console.log("Beginning client reset for ", realm.path);
      },
      clientResyncAfter: (beforeRealm, afterRealm) => {
        console.log("Finished client reset for", beforeRealm.path);
        console.log("New realm path", afterRealm.path);
      },
    },
    error: handleSyncError,
  },
};
