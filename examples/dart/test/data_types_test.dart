import 'package:realm_dart/realm.dart';

// :snippet-start: data-types-example-model

part 'data_types_test.g.dart'; // :remove:
// :uncomment-start:
// part 'car.g.dart';
// :uncomment-end:

@RealmModel()
class _Car {
  @PrimaryKey()
  late final int id; // Flutter SDK does not yet support ObjectId

  String? licensePlate;
  final bool isElectric = false;
  double milesDriven = 0;
  late final List<String> attributes = [];
  late _Person? owner;
}

@RealmModel()
class _Person {
  @PrimaryKey()
  late final int id; // Flutter SDK does not yet support ObjectId

  late String name;
  late int age;
}
// :snippet-end:

main() {}
