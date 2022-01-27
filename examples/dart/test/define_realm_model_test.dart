import 'package:realm_dart/realm.dart';
// :snippet-start: define-model
// :uncomment-start:
// import 'package:realm/realm.dart';
// :uncomment-end:

part 'define_realm_model_test.g.dart'; // :remove:
// :uncomment-start:
// part 'car.g.dart';
// :uncomment-end:

@RealmModel()
class _Car {
  @PrimaryKey()
  late final String make;

  late final String model;
  late int? miles;
}
// :snippet-end:

main() {}
