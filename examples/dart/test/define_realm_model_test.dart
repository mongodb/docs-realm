import 'package:realm_dart/realm.dart';
// :snippet-start: define-model
// :uncomment-start:
// import 'package:realm/realm.dart';
// :uncomment-end:/Users/ben.p/projects/docs-realm/examples/dart/test/define_realm_model_test.dart

part 'Car.g.dart';

@RealmModel()
class _Car {
  @PrimaryKey()
  late final String make;

  late final String model;
  late int? miles;
}
// :snippet-end:
