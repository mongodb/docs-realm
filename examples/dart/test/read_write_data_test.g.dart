// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'read_write_data_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Person extends _Person with RealmEntity, RealmObjectBase, RealmObject {
  Person(
    String name,
  ) {
    RealmObjectBase.set(this, 'name', name);
  }

  Person._();

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

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
    ]);
  }
}

class Team extends _Team with RealmEntity, RealmObjectBase, RealmObject {
  Team(
    String name, {
    Iterable<Person> crew = const [],
  }) {
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set<RealmList<Person>>(
        this, 'crew', RealmList<Person>(crew));
  }

  Team._();

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  RealmList<Person> get crew =>
      RealmObjectBase.get<Person>(this, 'crew') as RealmList<Person>;
  @override
  set crew(covariant RealmList<Person> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<Team>> get changes =>
      RealmObjectBase.getChanges<Team>(this);

  @override
  Team freeze() => RealmObjectBase.freezeObject<Team>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Team._);
    return const SchemaObject(ObjectType.realmObject, Team, 'Team', [
      SchemaProperty('name', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('crew', RealmPropertyType.object,
          linkTarget: 'Person', collectionType: RealmCollectionType.list),
    ]);
  }
}
