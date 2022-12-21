final realm = Realm(Configuration.local([RealmValueExample.schema]));

realm.write(() {
  realm.addAll([
    RealmValueExample(
        singleAnyValue: RealmValue.from(1),
        listOfMixedAnyValues: [Uuid.v4(), "abc", 123].map(RealmValue.from)),
    RealmValueExample(
        singleAnyValue: RealmValue.nullValue(),
        listOfMixedAnyValues: ["abc", 123].map(RealmValue.from))
  ]);
});
