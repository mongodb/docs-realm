final data = realm.all<RealmValueExample>();
for (var obj in data) {
  switch (obj.singleAnyValue.type) {
    // Use RealmValueType data type enums
    case RealmValueType.int:
      print('Int value: ${obj.singleAnyValue.value}');
      break;
    case RealmValueType.string:
      print('String value: ${obj.singleAnyValue.value}');
      break;
    // Handle additional cases ...
    default:
      print('Unhandled type: ${obj.singleAnyValue.type}');
  }
}
expect(calledCount, 1);
