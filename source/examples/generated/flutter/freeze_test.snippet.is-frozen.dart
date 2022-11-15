// You can check if all freezable types are frozen
// with the `isFrozen` property.

Realm realm = Realm(config);
print(realm.isFrozen);

RealmResults people = realm.all<Person>();
print(people.isFrozen);

Person firstPerson =
    realm.query<Person>("firstName = \$0", ["Yoda"]).first;
print(firstPerson.isFrozen);

RealmList<String> firstPersonAttributes = firstPerson.attributes;
print(firstPersonAttributes.isFrozen);
