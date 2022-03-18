
part 'car.g.dart';

@RealmModel()
class _Car {
  @PrimaryKey()
  late final int id;

  String? licensePlate;
  final bool isElectric = false;
  double milesDriven = 0;
  late final List<String> attributes = [];
  late _Person? owner;
}

@RealmModel()
class _Person {
  @PrimaryKey()
  late final int id;

  late String name;
  late int age;
}
