// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'Car.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Car extends _Car with RealmObject {
  Car(
    String make,
    String model, {
    int? miles,
  }) {
    RealmObject.set(this, 'make', make);
    RealmObject.set(this, 'model', model);
    this.miles = miles;
  }

  Car._();

  @override
  String get make => RealmObject.get<String>(this, 'make') as String;
  @override
  set make(String value) => throw RealmUnsupportedSetError();

  @override
  String get model => RealmObject.get<String>(this, 'model') as String;
  @override
  set model(String value) => throw RealmUnsupportedSetError();

  @override
  int? get miles => RealmObject.get<int>(this, 'miles') as int?;
  @override
  set miles(int? value) => RealmObject.set(this, 'miles', value);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Car._);
    return const SchemaObject(Car, [
      SchemaProperty('make', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('model', RealmPropertyType.string),
      SchemaProperty('miles', RealmPropertyType.int, optional: true),
    ]);
  }
}
