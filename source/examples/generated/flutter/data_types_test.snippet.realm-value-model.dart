@RealmModel()
class _RealmValueExample {
  @Indexed()
  late RealmValue singleAnyValue;
  late List<RealmValue> listOfMixedAnyValues;
  late Map<String, RealmValue> mapOfMixedAnyValues;
}

