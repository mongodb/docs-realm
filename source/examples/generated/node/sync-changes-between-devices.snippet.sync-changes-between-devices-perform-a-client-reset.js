let realm = await Realm.open(config);
function errorSync(_session, error) {
  if (realm) {
    if (error.name === "ClientReset") {
      const realmPath = "<Your Realm Path>";

      realm.close();

      console.log(`Error ${error.message}, need to reset ${realmPath}…`);
      Realm.App.Sync.initiateClientReset(app, realmPath); // pass your realm app instance, and realm path to initiateClientReset()
      console.log(`Creating backup from ${error.config.path}…`);
      // Move backup file to a known location for a restore
      fs.renameSync(error.config.path, realmPath + "~");
      // Discard the reference to the realm instance
      realm = null;
    } else {
      console.log(`Received error ${error.message}`);
    }
  }
}
var config = {
  schema: [DogSchema], // predefined schema
  sync: {
    user: app.currentUser,
    partitionValue: "MyPartitionValue",
    error: errorSync,
  },
};
