final realm = Realm(Configuration.local([RealmValueExample.schema]));

realm.write(() {
  realm.addAll([
    RealmValueExample(
        anyValue: RealmValue.from(1),
        mixedAnyValues: [Uuid.v4(), "abc", 123].map(RealmValue.from)),
    RealmValueExample(
        anyValue: RealmValue.nullValue(),
        mixedAnyValues: ["abc", 123].map(RealmValue.from))
  ]);
});
