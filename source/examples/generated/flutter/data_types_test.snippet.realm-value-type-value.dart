final data = realm.all<RealmValueExample>();
for (var obj in data) {
  if (obj.anyValue.type == int) {
    print(obj.anyValue.value.toString());
  }
}
