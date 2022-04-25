Realm.copyBundledRealmFiles();

realm = await Realm.open({
  schema: [Dog],
  path: 'bundle.realm',
});
