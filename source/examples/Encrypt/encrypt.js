const key = new Int8Array(64); // pupulate with a secure key
Realm.open({ schema: [DogSchema], encryptionKey: key }).then((realm) => {
  // Use the Realm as normal
  const dogs = realm.objects("Dog");

  // ...
});
