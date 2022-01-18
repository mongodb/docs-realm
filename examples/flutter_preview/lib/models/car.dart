// :snippet-start: define-model
// import 'package:flutter/material.dart';

// Realm: Import realm
import 'package:realm_dart/realm.dart';

// Realm: Declare a part file
part 'car.g.dart';

// Realm: Creating a Realm object data model class
class _Car {
  @RealmProperty(primaryKey: true)
  String make;
  @RealmProperty()
  String model;
  @RealmProperty(defaultValue: "500", optional: true)
  int kilometers;
}
// :snippet-end:
