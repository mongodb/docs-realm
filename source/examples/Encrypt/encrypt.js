// Retrieve key from secure location or create one...
const key = new Int8Array(64); // Populate with a secure key
// ... store key ...

// Use key to open realm
Realm.open({ schema: [DogSchema], encryptionKey: key }).then((realm) => {
  // Use the realm as normal
  const dogs = realm.objects("Dog");

  // ...
});
