// :snippet-start: migrate-model-dart-old
// :uncomment-start:
// import 'package:realm_dart/realm.dart';

// part 'car.g.dart'; // :emphasize:

// @RealmModel()
// class _Car {
//   @PrimaryKey()
//   late ObjectId id;

//   late String make;
//   late String? model;
//   late int? miles;
// }
// :uncomment-end:
// :snippet-end:

// :snippet-start: migrate-model-dart-new
import 'package:realm_dart/realm.dart';

part 'car.realm.dart'; // :emphasize:

@RealmModel()
class _Car {
  @PrimaryKey()
  late ObjectId id;

  late String make;
  late String? model;
  late int? miles;
}
// :snippet-end:
