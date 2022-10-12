// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'freeze_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Person extends _Person with RealmEntity, RealmObject {
  Person(
    int id,
    String firstName,
    String lastName, {
    Iterable<String> attributes = const [],
  }) {
    RealmObject.set(this, 'id', id);
    RealmObject.set(this, 'firstName', firstName);
    RealmObject.set(this, 'lastName', lastName);
    RealmObject.set<RealmList<String>>(
        this, 'attributes', RealmList<String>(attributes));
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
  RealmList<String> get attributes =>
      RealmObject.get<String>(this, 'attributes') as RealmList<String>;
  @override
  set attributes(covariant RealmList<String> value) =>
      throw RealmUnsupportedSetError();

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
      SchemaProperty('attributes', RealmPropertyType.string,
          collectionType: RealmCollectionType.list),
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
