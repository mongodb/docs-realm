const realm = new Realm({
  schema: [<yourSchema>],
});
// Get on-disk location of the default Realm
const realmFileLocation = realm.path;

console.log("Realm file is located at: " + realm.path);
