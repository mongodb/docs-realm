final realm = Realm(Configuration.local([RealmValueExample.schema]));

realm.write(() {
  var anyValue = realm.add(RealmValueExample(
      singleAnyValue: RealmValue.from(1),
      listOfMixedAnyValues: [Uuid.v4(), 'abc', 123].map(RealmValue.from),
      mapOfMixedAnyValues: {
        '1': RealmValue.from(123),
        '2': RealmValue.from('abc')
      }));

  // Use 'RealmValue.nullValue()' to set null values
  var anyValueNull = realm.add(RealmValueExample(
      singleAnyValue: RealmValue.nullValue(),
      listOfMixedAnyValues: [null, null].map(RealmValue.from),
      mapOfMixedAnyValues: {'null': RealmValue.nullValue()}));

