// Get on-disk location of the default Realm
const realmFileLocation = await Realm.open({}).then(realm => {
  console.log("Realm file is located at: " + realm.path);

  return realm.path;
});
