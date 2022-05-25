// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'manage_sync_session_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Plane extends _Plane with RealmEntity, RealmObject {
  Plane(
    int id,
    String name,
    int numSeats,
  ) {
    RealmObject.set(this, '_id', id);
    RealmObject.set(this, 'name', name);
    RealmObject.set(this, 'numSeats', numSeats);
  }

  Plane._();

  @override
  int get id => RealmObject.get<int>(this, '_id') as int;
  @override
  set id(int value) => throw RealmUnsupportedSetError();

  @override
  String get name => RealmObject.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObject.set(this, 'name', value);

  @override
  int get numSeats => RealmObject.get<int>(this, 'numSeats') as int;
  @override
  set numSeats(int value) => RealmObject.set(this, 'numSeats', value);

  @override
  Stream<RealmObjectChanges<Plane>> get changes =>
      RealmObject.getChanges<Plane>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Plane._);
    return const SchemaObject(Plane, 'Plane', [
      SchemaProperty('_id', RealmPropertyType.int,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('numSeats', RealmPropertyType.int),
    ]);
  }
}

class Train extends _Train with RealmEntity, RealmObject {
  Train(
    int id,
    String name,
    int numCars,
  ) {
    RealmObject.set(this, '_id', id);
    RealmObject.set(this, 'name', name);
    RealmObject.set(this, 'numCars', numCars);
  }

  Train._();

  @override
  int get id => RealmObject.get<int>(this, '_id') as int;
  @override
  set id(int value) => throw RealmUnsupportedSetError();

  @override
  String get name => RealmObject.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObject.set(this, 'name', value);

  @override
  int get numCars => RealmObject.get<int>(this, 'numCars') as int;
  @override
  set numCars(int value) => RealmObject.set(this, 'numCars', value);

  @override
  Stream<RealmObjectChanges<Train>> get changes =>
      RealmObject.getChanges<Train>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Train._);
    return const SchemaObject(Train, 'Train', [
      SchemaProperty('_id', RealmPropertyType.int,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('numCars', RealmPropertyType.int),
    ]);
  }
}

class Boat extends _Boat with RealmEntity, RealmObject {
  Boat(
    int id,
    String name,
    int tonnage,
  ) {
    RealmObject.set(this, '_id', id);
    RealmObject.set(this, 'name', name);
    RealmObject.set(this, 'tonnage', tonnage);
  }

  Boat._();

  @override
  int get id => RealmObject.get<int>(this, '_id') as int;
  @override
  set id(int value) => throw RealmUnsupportedSetError();

  @override
  String get name => RealmObject.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObject.set(this, 'name', value);

  @override
  int get tonnage => RealmObject.get<int>(this, 'tonnage') as int;
  @override
  set tonnage(int value) => RealmObject.set(this, 'tonnage', value);

  @override
  Stream<RealmObjectChanges<Boat>> get changes =>
      RealmObject.getChanges<Boat>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Boat._);
    return const SchemaObject(Boat, 'Boat', [
      SchemaProperty('_id', RealmPropertyType.int,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('tonnage', RealmPropertyType.int),
    ]);
  }
}
