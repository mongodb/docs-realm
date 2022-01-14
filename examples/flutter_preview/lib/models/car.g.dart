// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'car.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Car extends RealmObject {
  // ignore_for_file: unused_element, unused_local_variable
  Car._constructor() : super.constructor();
  Car();

  @RealmProperty(primaryKey: true)
  String get make => super['make'] as String;
  set make(String value) => super['make'] = value;

  @RealmProperty()
  String get model => super['model'] as String;
  set model(String value) => super['model'] = value;

  @RealmProperty(defaultValue: "500", optional: true)
  int get kilometers => super['kilometers'] as int;
  set kilometers(int value) => super['kilometers'] = value;

  static dynamic getSchema() {
    const dynamic type = _Car;
    return RealmObject.getSchema('Car', [
      SchemaProperty('make', type: 'string', primaryKey: true),
      SchemaProperty('model', type: 'string'),
      SchemaProperty('kilometers', type: 'int', defaultValue: "500", optional: true),
    ]);
  }
}
