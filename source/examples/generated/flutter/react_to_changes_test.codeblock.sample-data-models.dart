@RealmModel()
class _Character {
  @PrimaryKey()
  late String name;

  late String species;
  late int age;
}

@RealmModel()
class _Fellowship {
  @PrimaryKey()
  late String name;

  late List<_Character> members;
}
