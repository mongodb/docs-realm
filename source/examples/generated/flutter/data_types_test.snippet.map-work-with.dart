final realm = Realm(Configuration.local([MapExample.schema]));

// Pass native Dart Maps to the object to create RealmMaps
final mapExample = MapExample(
  map: {
    'first': 1,
    'second': 2,
    'third': 3,
  },
  nullableMap: {
    'first': null,
    'second': 2,
    'third': null,
  },
);

// Add RealmObject to realm database
realm.write(() => realm.add(mapExample));

// Qeury for all MapExample objects
final realmMap = realm.all<MapExample>()[0];

// Modify RealmMaps in write transactions
realm.write(() {
  realmMap.map.update('first', (value) => 5);
  realmMap.nullableMap.update('second', (value) => null);

  // Add a new Map to a RealmMap
  const newMap = {'fourth': 4};
  realmMap.map.addEntries(newMap.entries);
});
