// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'data_types_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Car extends _Car with RealmEntity, RealmObject {
  static var _defaultsSet = false;

  Car(
    int id, {
    String? licensePlate,
    bool isElectric = false,
    double milesDriven = 0,
    Person? owner,
    Iterable<String> attributes = const [],
  }) {
    if (!_defaultsSet) {
      _defaultsSet = RealmObject.setDefaults<Car>({
        'isElectric': false,
        'milesDriven': 0,
      });
    }
    RealmObject.set(this, 'id', id);
    RealmObject.set(this, 'licensePlate', licensePlate);
    RealmObject.set(this, 'isElectric', isElectric);
    RealmObject.set(this, 'milesDriven', milesDriven);
    RealmObject.set(this, 'owner', owner);
    RealmObject.set<RealmList<String>>(
        this, 'attributes', RealmList<String>(attributes));
  }

  Car._();

  @override
  int get id => RealmObject.get<int>(this, 'id') as int;
  @override
  set id(int value) => RealmObject.set(this, 'id', value);

  @override
  String? get licensePlate =>
      RealmObject.get<String>(this, 'licensePlate') as String?;
  @override
  set licensePlate(String? value) =>
      RealmObject.set(this, 'licensePlate', value);

  @override
  bool get isElectric => RealmObject.get<bool>(this, 'isElectric') as bool;
  @override
  set isElectric(bool value) => RealmObject.set(this, 'isElectric', value);

  @override
  double get milesDriven =>
      RealmObject.get<double>(this, 'milesDriven') as double;
  @override
  set milesDriven(double value) => RealmObject.set(this, 'milesDriven', value);

  @override
  RealmList<String> get attributes =>
      RealmObject.get<String>(this, 'attributes') as RealmList<String>;
  @override
  set attributes(covariant RealmList<String> value) =>
      throw RealmUnsupportedSetError();

  @override
  Person? get owner => RealmObject.get<Person>(this, 'owner') as Person?;
  @override
  set owner(covariant Person? value) => RealmObject.set(this, 'owner', value);

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
      SchemaProperty('id', RealmPropertyType.int, primaryKey: true),
      SchemaProperty('licensePlate', RealmPropertyType.string, optional: true),
      SchemaProperty('isElectric', RealmPropertyType.bool),
      SchemaProperty('milesDriven', RealmPropertyType.double),
      SchemaProperty('attributes', RealmPropertyType.string,
          collectionType: RealmCollectionType.list),
      SchemaProperty('owner', RealmPropertyType.object,
          optional: true, linkTarget: 'Person'),
    ]);
  }
}

class Person extends _Person with RealmEntity, RealmObject {
  Person(
    int id,
    String name,
    int age,
  ) {
    RealmObject.set(this, 'id', id);
    RealmObject.set(this, 'name', name);
    RealmObject.set(this, 'age', age);
  }

  Person._();

  @override
  int get id => RealmObject.get<int>(this, 'id') as int;
  @override
  set id(int value) => RealmObject.set(this, 'id', value);

  @override
  String get name => RealmObject.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObject.set(this, 'name', value);

  @override
  int get age => RealmObject.get<int>(this, 'age') as int;
  @override
  set age(int value) => RealmObject.set(this, 'age', value);

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
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('age', RealmPropertyType.int),
    ]);
  }
}

class UuidPrimaryKey extends _UuidPrimaryKey with RealmEntity, RealmObject {
  UuidPrimaryKey(
    Uuid id,
  ) {
    RealmObject.set(this, 'id', id);
  }

  UuidPrimaryKey._();

  @override
  Uuid get id => RealmObject.get<Uuid>(this, 'id') as Uuid;
  @override
  set id(Uuid value) => RealmObject.set(this, 'id', value);

  @override
  Stream<RealmObjectChanges<UuidPrimaryKey>> get changes =>
      RealmObject.getChanges<UuidPrimaryKey>(this);

  @override
  UuidPrimaryKey freeze() => RealmObject.freezeObject<UuidPrimaryKey>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(UuidPrimaryKey._);
    return const SchemaObject(UuidPrimaryKey, 'UuidPrimaryKey', [
      SchemaProperty('id', RealmPropertyType.uuid, primaryKey: true),
    ]);
  }
}

class ObjectIdPrimaryKey extends _ObjectIdPrimaryKey
    with RealmEntity, RealmObject {
  ObjectIdPrimaryKey(
    ObjectId id,
  ) {
    RealmObject.set(this, 'id', id);
  }

  ObjectIdPrimaryKey._();

  @override
  ObjectId get id => RealmObject.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObject.set(this, 'id', value);

  @override
  Stream<RealmObjectChanges<ObjectIdPrimaryKey>> get changes =>
      RealmObject.getChanges<ObjectIdPrimaryKey>(this);

  @override
  ObjectIdPrimaryKey freeze() =>
      RealmObject.freezeObject<ObjectIdPrimaryKey>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(ObjectIdPrimaryKey._);
    return const SchemaObject(ObjectIdPrimaryKey, 'ObjectIdPrimaryKey', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
    ]);
  }
}

class Vehicle extends _Vehicle with RealmEntity, RealmObject {
  Vehicle(
    String nickname,
    DateTime dateLastServiced,
  ) {
    RealmObject.set(this, 'nickname', nickname);
    RealmObject.set(this, 'dateLastServiced', dateLastServiced);
  }

  Vehicle._();

  @override
  String get nickname => RealmObject.get<String>(this, 'nickname') as String;
  @override
  set nickname(String value) => RealmObject.set(this, 'nickname', value);

  @override
  DateTime get dateLastServiced =>
      RealmObject.get<DateTime>(this, 'dateLastServiced') as DateTime;
  @override
  set dateLastServiced(DateTime value) =>
      RealmObject.set(this, 'dateLastServiced', value);

  @override
  Stream<RealmObjectChanges<Vehicle>> get changes =>
      RealmObject.getChanges<Vehicle>(this);

  @override
  Vehicle freeze() => RealmObject.freezeObject<Vehicle>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Vehicle._);
    return const SchemaObject(Vehicle, 'Vehicle', [
      SchemaProperty('nickname', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('dateLastServiced', RealmPropertyType.timestamp),
    ]);
  }
}
