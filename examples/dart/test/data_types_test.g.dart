// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'data_types_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Car extends _Car with RealmEntity, RealmObjectBase, RealmObject {
  static var _defaultsSet = false;

  Car(
    ObjectId id, {
    String? licensePlate,
    bool isElectric = false,
    double milesDriven = 0,
    Person? owner,
    Iterable<String> attributes = const [],
  }) {
    if (!_defaultsSet) {
      _defaultsSet = RealmObjectBase.setDefaults<Car>({
        'isElectric': false,
        'milesDriven': 0,
      });
    }
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'licensePlate', licensePlate);
    RealmObjectBase.set(this, 'isElectric', isElectric);
    RealmObjectBase.set(this, 'milesDriven', milesDriven);
    RealmObjectBase.set(this, 'owner', owner);
    RealmObjectBase.set<RealmList<String>>(
        this, 'attributes', RealmList<String>(attributes));
  }

  Car._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String? get licensePlate =>
      RealmObjectBase.get<String>(this, 'licensePlate') as String?;
  @override
  set licensePlate(String? value) =>
      RealmObjectBase.set(this, 'licensePlate', value);

  @override
  bool get isElectric => RealmObjectBase.get<bool>(this, 'isElectric') as bool;
  @override
  set isElectric(bool value) => RealmObjectBase.set(this, 'isElectric', value);

  @override
  double get milesDriven =>
      RealmObjectBase.get<double>(this, 'milesDriven') as double;
  @override
  set milesDriven(double value) =>
      RealmObjectBase.set(this, 'milesDriven', value);

  @override
  RealmList<String> get attributes =>
      RealmObjectBase.get<String>(this, 'attributes') as RealmList<String>;
  @override
  set attributes(covariant RealmList<String> value) =>
      throw RealmUnsupportedSetError();

  @override
  Person? get owner => RealmObjectBase.get<Person>(this, 'owner') as Person?;
  @override
  set owner(covariant Person? value) =>
      RealmObjectBase.set(this, 'owner', value);

  @override
  Stream<RealmObjectChanges<Car>> get changes =>
      RealmObjectBase.getChanges<Car>(this);

  @override
  Car freeze() => RealmObjectBase.freezeObject<Car>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Car._);
    return const SchemaObject(ObjectType.realmObject, Car, 'Car', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
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

class Address extends _Address
    with RealmEntity, RealmObjectBase, EmbeddedObject {
  Address(
    String street,
    String city,
    String state,
    String country,
  ) {
    RealmObjectBase.set(this, 'street', street);
    RealmObjectBase.set(this, 'city', city);
    RealmObjectBase.set(this, 'state', state);
    RealmObjectBase.set(this, 'country', country);
  }

  Address._();

  @override
  String get street => RealmObjectBase.get<String>(this, 'street') as String;
  @override
  set street(String value) => RealmObjectBase.set(this, 'street', value);

  @override
  String get city => RealmObjectBase.get<String>(this, 'city') as String;
  @override
  set city(String value) => RealmObjectBase.set(this, 'city', value);

  @override
  String get state => RealmObjectBase.get<String>(this, 'state') as String;
  @override
  set state(String value) => RealmObjectBase.set(this, 'state', value);

  @override
  String get country => RealmObjectBase.get<String>(this, 'country') as String;
  @override
  set country(String value) => RealmObjectBase.set(this, 'country', value);

  @override
  Stream<RealmObjectChanges<Address>> get changes =>
      RealmObjectBase.getChanges<Address>(this);

  @override
  Address freeze() => RealmObjectBase.freezeObject<Address>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Address._);
    return const SchemaObject(ObjectType.embeddedObject, Address, 'Address', [
      SchemaProperty('street', RealmPropertyType.string),
      SchemaProperty('city', RealmPropertyType.string),
      SchemaProperty('state', RealmPropertyType.string),
      SchemaProperty('country', RealmPropertyType.string),
    ]);
  }
}

class Person extends _Person with RealmEntity, RealmObjectBase, RealmObject {
  Person(
    String name, {
    Address? address,
  }) {
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'address', address);
  }

  Person._();

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  Address? get address =>
      RealmObjectBase.get<Address>(this, 'address') as Address?;
  @override
  set address(covariant Address? value) =>
      RealmObjectBase.set(this, 'address', value);

  @override
  Stream<RealmObjectChanges<Person>> get changes =>
      RealmObjectBase.getChanges<Person>(this);

  @override
  Person freeze() => RealmObjectBase.freezeObject<Person>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Person._);
    return const SchemaObject(ObjectType.realmObject, Person, 'Person', [
      SchemaProperty('name', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('address', RealmPropertyType.object,
          optional: true, linkTarget: 'Address'),
    ]);
  }
}

class UuidPrimaryKey extends _UuidPrimaryKey
    with RealmEntity, RealmObjectBase, RealmObject {
  UuidPrimaryKey(
    Uuid id,
  ) {
    RealmObjectBase.set(this, 'id', id);
  }

  UuidPrimaryKey._();

  @override
  Uuid get id => RealmObjectBase.get<Uuid>(this, 'id') as Uuid;
  @override
  set id(Uuid value) => RealmObjectBase.set(this, 'id', value);

  @override
  Stream<RealmObjectChanges<UuidPrimaryKey>> get changes =>
      RealmObjectBase.getChanges<UuidPrimaryKey>(this);

  @override
  UuidPrimaryKey freeze() => RealmObjectBase.freezeObject<UuidPrimaryKey>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(UuidPrimaryKey._);
    return const SchemaObject(
        ObjectType.realmObject, UuidPrimaryKey, 'UuidPrimaryKey', [
      SchemaProperty('id', RealmPropertyType.uuid, primaryKey: true),
    ]);
  }
}

class ObjectIdPrimaryKey extends _ObjectIdPrimaryKey
    with RealmEntity, RealmObjectBase, RealmObject {
  ObjectIdPrimaryKey(
    ObjectId id,
  ) {
    RealmObjectBase.set(this, 'id', id);
  }

  ObjectIdPrimaryKey._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  Stream<RealmObjectChanges<ObjectIdPrimaryKey>> get changes =>
      RealmObjectBase.getChanges<ObjectIdPrimaryKey>(this);

  @override
  ObjectIdPrimaryKey freeze() =>
      RealmObjectBase.freezeObject<ObjectIdPrimaryKey>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(ObjectIdPrimaryKey._);
    return const SchemaObject(
        ObjectType.realmObject, ObjectIdPrimaryKey, 'ObjectIdPrimaryKey', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
    ]);
  }
}

class Vehicle extends _Vehicle with RealmEntity, RealmObjectBase, RealmObject {
  Vehicle(
    String nickname,
    DateTime dateLastServiced,
  ) {
    RealmObjectBase.set(this, 'nickname', nickname);
    RealmObjectBase.set(this, 'dateLastServiced', dateLastServiced);
  }

  Vehicle._();

  @override
  String get nickname =>
      RealmObjectBase.get<String>(this, 'nickname') as String;
  @override
  set nickname(String value) => RealmObjectBase.set(this, 'nickname', value);

  @override
  DateTime get dateLastServiced =>
      RealmObjectBase.get<DateTime>(this, 'dateLastServiced') as DateTime;
  @override
  set dateLastServiced(DateTime value) =>
      RealmObjectBase.set(this, 'dateLastServiced', value);

  @override
  Stream<RealmObjectChanges<Vehicle>> get changes =>
      RealmObjectBase.getChanges<Vehicle>(this);

  @override
  Vehicle freeze() => RealmObjectBase.freezeObject<Vehicle>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Vehicle._);
    return const SchemaObject(ObjectType.realmObject, Vehicle, 'Vehicle', [
      SchemaProperty('nickname', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('dateLastServiced', RealmPropertyType.timestamp),
    ]);
  }
}

class Player extends _Player with RealmEntity, RealmObjectBase, RealmObject {
  Player(
    String username, {
    Iterable<Item> inventory = const [],
    Iterable<String> traits = const [],
  }) {
    RealmObjectBase.set(this, 'username', username);
    RealmObjectBase.set<RealmList<Item>>(
        this, 'inventory', RealmList<Item>(inventory));
    RealmObjectBase.set<RealmList<String>>(
        this, 'traits', RealmList<String>(traits));
  }

  Player._();

  @override
  String get username =>
      RealmObjectBase.get<String>(this, 'username') as String;
  @override
  set username(String value) => RealmObjectBase.set(this, 'username', value);

  @override
  RealmList<Item> get inventory =>
      RealmObjectBase.get<Item>(this, 'inventory') as RealmList<Item>;
  @override
  set inventory(covariant RealmList<Item> value) =>
      throw RealmUnsupportedSetError();

  @override
  RealmList<String> get traits =>
      RealmObjectBase.get<String>(this, 'traits') as RealmList<String>;
  @override
  set traits(covariant RealmList<String> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<Player>> get changes =>
      RealmObjectBase.getChanges<Player>(this);

  @override
  Player freeze() => RealmObjectBase.freezeObject<Player>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Player._);
    return const SchemaObject(ObjectType.realmObject, Player, 'Player', [
      SchemaProperty('username', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('inventory', RealmPropertyType.object,
          linkTarget: 'Item', collectionType: RealmCollectionType.list),
      SchemaProperty('traits', RealmPropertyType.string,
          collectionType: RealmCollectionType.list),
    ]);
  }
}

class Item extends _Item with RealmEntity, RealmObjectBase, RealmObject {
  Item(
    String name,
    String description,
  ) {
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'description', description);
  }

  Item._();

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  String get description =>
      RealmObjectBase.get<String>(this, 'description') as String;
  @override
  set description(String value) =>
      RealmObjectBase.set(this, 'description', value);

  @override
  Stream<RealmObjectChanges<Item>> get changes =>
      RealmObjectBase.getChanges<Item>(this);

  @override
  Item freeze() => RealmObjectBase.freezeObject<Item>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Item._);
    return const SchemaObject(ObjectType.realmObject, Item, 'Item', [
      SchemaProperty('name', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('description', RealmPropertyType.string),
    ]);
  }
}
