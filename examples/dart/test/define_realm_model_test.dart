// Used in quickstart
// :snippet-start: define-model
// :state-start: dart
import 'package:realm_dart/realm.dart';
// :state-end:

// :state-start: flutter
// :state-uncomment-start: flutter
// import 'package:realm/realm.dart';
// :state-uncomment-end:
// :state-end:

part 'define_realm_model_test.g.dart'; // :remove:
// :uncomment-start:
// part 'car.g.dart';
// :uncomment-end:

@RealmModel()
class _Car {
  @PrimaryKey()
  late final String make;

  late String? model;
  late int? miles;
}
// :snippet-end:

main() {}
