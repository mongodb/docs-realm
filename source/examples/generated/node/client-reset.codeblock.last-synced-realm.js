// TODO: i think this approach won't work for JS if you're tracking multiple realms w
// the same partition
// b/c it doesn't track sync by realm, only by sync session.
// maybe can do `Track updates separately from objects` approach w unique partition
// so the sync session only tracks the updates
const LastSyncedSchema = {
  name: "LastSynced",
  properties: {
    realmTracked: "string",
    timestamp: "int?",
  },
  primaryKey: "realmTracked",
};
const lastSyncedConfig = { schema: [LastSyncedSchema] };
const lastSyncedRealm = await Realm.open(lastSyncedConfig);
lastSyncedRealm.write(() => {
  lastSyncedRealm.create("LastSynced", {
    realmTracked: "Dog",
  });
});
