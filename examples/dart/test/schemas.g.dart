// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'schemas.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Car extends _Car with RealmEntity, RealmObject {
  Car(
    String make, {
    String? model,
    int? miles,
  }) {
    RealmObject.set(this, 'make', make);
    RealmObject.set(this, 'model', model);
    RealmObject.set(this, 'miles', miles);
  }

  Car._();

  @override
  String get make => RealmObject.get<String>(this, 'make') as String;
  @override
  set make(String value) => RealmObject.set(this, 'make', value);

  @override
  String? get model => RealmObject.get<String>(this, 'model') as String?;
  @override
  set model(String? value) => RealmObject.set(this, 'model', value);

  @override
  int? get miles => RealmObject.get<int>(this, 'miles') as int?;
  @override
  set miles(int? value) => RealmObject.set(this, 'miles', value);

  @override
  Stream<RealmObjectChanges<Car>> get changes =>
      RealmObject.getChanges<Car>(this);

  @override
  Car freeze() => RealmObject.freezeObject<Car>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Car._);
    return const SchemaObject(Car, 'Car', [
      SchemaProperty('make', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('model', RealmPropertyType.string, optional: true),
      SchemaProperty('miles', RealmPropertyType.int, optional: true),
    ]);
  }
}

class SyncSchema extends _SyncSchema with RealmEntity, RealmObject {
  SyncSchema(
    int id,
  ) {
    RealmObject.set(this, '_id', id);
  }

  SyncSchema._();

  @override
  int get id => RealmObject.get<int>(this, '_id') as int;
  @override
  set id(int value) => RealmObject.set(this, '_id', value);

  @override
  Stream<RealmObjectChanges<SyncSchema>> get changes =>
      RealmObject.getChanges<SyncSchema>(this);

  @override
  SyncSchema freeze() => RealmObject.freezeObject<SyncSchema>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(SyncSchema._);
    return const SchemaObject(SyncSchema, 'SyncSchema', [
      SchemaProperty('_id', RealmPropertyType.int,
          mapTo: '_id', primaryKey: true),
    ]);
  }
}

class Bike extends _Bike with RealmEntity, RealmObject {
  Bike(
    int id,
    String name, {
    Person? owner,
  }) {
    RealmObject.set(this, 'id', id);
    RealmObject.set(this, 'name', name);
    RealmObject.set(this, 'owner', owner);
  }

  Bike._();

  @override
  int get id => RealmObject.get<int>(this, 'id') as int;
  @override
  set id(int value) => RealmObject.set(this, 'id', value);

  @override
  String get name => RealmObject.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObject.set(this, 'name', value);

  @override
  Person? get owner => RealmObject.get<Person>(this, 'owner') as Person?;
  @override
  set owner(covariant Person? value) => RealmObject.set(this, 'owner', value);

  @override
  Stream<RealmObjectChanges<Bike>> get changes =>
      RealmObject.getChanges<Bike>(this);

  @override
  Bike freeze() => RealmObject.freezeObject<Bike>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Bike._);
    return const SchemaObject(Bike, 'Bike', [
      SchemaProperty('id', RealmPropertyType.int, primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('owner', RealmPropertyType.object,
          optional: true, linkTarget: 'Person'),
    ]);
  }
}

class Person extends _Person with RealmEntity, RealmObject {
  Person(
    int id,
    String firstName,
    String lastName, {
    int? age,
  }) {
    RealmObject.set(this, 'id', id);
    RealmObject.set(this, 'firstName', firstName);
    RealmObject.set(this, 'lastName', lastName);
    RealmObject.set(this, 'age', age);
  }

  Person._();

  @override
  int get id => RealmObject.get<int>(this, 'id') as int;
  @override
  set id(int value) => RealmObject.set(this, 'id', value);

  @override
  String get firstName => RealmObject.get<String>(this, 'firstName') as String;
  @override
  set firstName(String value) => RealmObject.set(this, 'firstName', value);

  @override
  String get lastName => RealmObject.get<String>(this, 'lastName') as String;
  @override
  set lastName(String value) => RealmObject.set(this, 'lastName', value);

  @override
  int? get age => RealmObject.get<int>(this, 'age') as int?;
  @override
  set age(int? value) => RealmObject.set(this, 'age', value);

  @override
  Stream<RealmObjectChanges<Person>> get changes =>
      RealmObject.getChanges<Person>(this);

  @override
  Person freeze() => RealmObject.freezeObject<Person>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Person._);
    return const SchemaObject(Person, 'Person', [
      SchemaProperty('id', RealmPropertyType.int, primaryKey: true),
      SchemaProperty('firstName', RealmPropertyType.string),
      SchemaProperty('lastName', RealmPropertyType.string),
      SchemaProperty('age', RealmPropertyType.int, optional: true),
    ]);
  }
}

class Scooter extends _Scooter with RealmEntity, RealmObject {
  Scooter(
    int id,
    String name, {
    Person? owner,
  }) {
    RealmObject.set(this, 'id', id);
    RealmObject.set(this, 'name', name);
    RealmObject.set(this, 'owner', owner);
  }

  Scooter._();

  @override
  int get id => RealmObject.get<int>(this, 'id') as int;
  @override
  set id(int value) => RealmObject.set(this, 'id', value);

  @override
  String get name => RealmObject.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObject.set(this, 'name', value);

  @override
  Person? get owner => RealmObject.get<Person>(this, 'owner') as Person?;
  @override
  set owner(covariant Person? value) => RealmObject.set(this, 'owner', value);

  @override
  Stream<RealmObjectChanges<Scooter>> get changes =>
      RealmObject.getChanges<Scooter>(this);

  @override
  Scooter freeze() => RealmObject.freezeObject<Scooter>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Scooter._);
    return const SchemaObject(Scooter, 'Scooter', [
      SchemaProperty('id', RealmPropertyType.int, primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('owner', RealmPropertyType.object,
          optional: true, linkTarget: 'Person'),
    ]);
  }
}

class ScooterShop extends _ScooterShop with RealmEntity, RealmObject {
  ScooterShop(
    int id,
    String name, {
    Iterable<Scooter> owner = const [],
  }) {
    RealmObject.set(this, 'id', id);
    RealmObject.set(this, 'name', name);
    RealmObject.set<RealmList<Scooter>>(
        this, 'owner', RealmList<Scooter>(owner));
  }

  ScooterShop._();

  @override
  int get id => RealmObject.get<int>(this, 'id') as int;
  @override
  set id(int value) => RealmObject.set(this, 'id', value);

  @override
  String get name => RealmObject.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObject.set(this, 'name', value);

  @override
  RealmList<Scooter> get owner =>
      RealmObject.get<Scooter>(this, 'owner') as RealmList<Scooter>;
  @override
  set owner(covariant RealmList<Scooter> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<ScooterShop>> get changes =>
      RealmObject.getChanges<ScooterShop>(this);

  @override
  ScooterShop freeze() => RealmObject.freezeObject<ScooterShop>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(ScooterShop._);
    return const SchemaObject(ScooterShop, 'ScooterShop', [
      SchemaProperty('id', RealmPropertyType.int, primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('owner', RealmPropertyType.object,
          linkTarget: 'Scooter', collectionType: RealmCollectionType.list),
    ]);
  }
}
