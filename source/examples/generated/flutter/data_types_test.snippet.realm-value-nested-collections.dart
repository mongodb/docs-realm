final singleAnyValue = RealmValue.from(1);
final listOfAnyValue = RealmValue.from([singleAnyValue]);
final mapOfAnyValue = RealmValue.from({
  '1': singleAnyValue,
  '2': singleAnyValue,
  '3': RealmValue.nullValue()
});

realm.write(() {
  var collectionsOfMixed = realm.add(RealmValueExample(
      singleAnyValue: singleAnyValue,
      listOfMixedAnyValues: [singleAnyValue, singleAnyValue],
      mapOfMixedAnyValues: {'key': singleAnyValue}));
  var nestedCollectionsOfMixed = realm.add(RealmValueExample(
      singleAnyValue: singleAnyValue,
      listOfMixedAnyValues: [
        RealmValue.from([
          listOfAnyValue,
          RealmValue.from([
            listOfAnyValue,
            RealmValue.from(
                [listOfAnyValue, mapOfAnyValue, singleAnyValue])
          ]),
        ])
      ],
      mapOfMixedAnyValues: {
        'key': RealmValue.from({
          'nestedKey_1': RealmValue.from({mapOfAnyValue}),
          'nestedKey_2': RealmValue.from({
            'nestedNestedKey_1': RealmValue.from({listOfAnyValue}),
            'nestedNestedKey_2': RealmValue.from({singleAnyValue})
          })
        })
      }));
