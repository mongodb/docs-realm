const encryptionKey = new Int8Array(64); // Create a secure key
// ... store key ...

const syncedEncryptedConfig = {
  schema: [Car], // predefined schema
  path: "syncedEncrypted.realm", // must include in output configuration
  sync: {
    user: app.currentUser, // already logged in user
    partitionValue: "myPartition",
  },
  encryptionKey,
};
const syncedEncryptedRealm = await Realm.open(syncedEncryptedConfig);

const localUnencryptedConfig = {
  schema: [Car], // predefined schema
  path: "copyLocalUnencrypted.realm", // must include in output configuration
};
syncedEncryptedRealm.writeCopyTo(localUnencryptedConfig);
const localUnencryptedRealm = await Realm.open(syncedEncryptedConfig);
