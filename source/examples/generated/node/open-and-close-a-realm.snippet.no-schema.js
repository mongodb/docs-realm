// Open the Realm with a schema
const realm = new Realm({ schema: [Car] });
const schemaBefore = realm.schema;

realm.close();

// Reopen it without a schema
const reopenedRealm = new Realm();
