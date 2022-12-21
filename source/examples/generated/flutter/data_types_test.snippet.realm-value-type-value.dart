final data = realm.all<RealmValueExample>();
for (var obj in data) {
  if (obj.singleAnyValue.type == int) {
    print(obj.singleAnyValue.value.toString());
  }
}
