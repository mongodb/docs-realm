// You can check if all freezable types are frozen
// with the `isFrozen` property.

Realm realm = Realm(config);
print(realm.isFrozen);

RealmResults people = realm.all<Person>();
print(people.isFrozen);

Person firstPerson = realm.find<Person>(1)!;
print(firstPerson.isFrozen);

RealmList<String> firstPersonAttributes = firstPerson.attributes;
print(firstPersonAttributes.isFrozen);
