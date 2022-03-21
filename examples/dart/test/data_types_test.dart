import 'package:realm_dart/realm.dart';

// :snippet-start: data-types-example-model

part 'data_types_test.g.dart'; // :remove:
// :uncomment-start:
// part 'car.g.dart';
// :uncomment-end:

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
// :snippet-end:

main() {}
