part 'car.g.dart';

@RealmModel()
class _Car {
  @PrimaryKey()
  late int id;

  String? licensePlate;
  bool isElectric = false;
  double milesDriven = 0;
  late List<String> attributes;
  late _Person? owner;
}

@RealmModel()
class _Person {
  @PrimaryKey()
  late int id;

  late String name;
  late int age;
}
