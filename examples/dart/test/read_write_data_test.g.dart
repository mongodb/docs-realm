// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'read_write_data_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Person extends _Person with RealmEntity, RealmObject {
  Person(
    String name,
  ) {
    RealmObject.set(this, 'name', name);
  }

  Person._();

  @override
  String get name => RealmObject.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObject.set(this, 'name', value);

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
      SchemaProperty('name', RealmPropertyType.string, primaryKey: true),
    ]);
  }
}

class Team extends _Team with RealmEntity, RealmObject {
  Team(
    String name, {
    Iterable<Person> crew = const [],
  }) {
    RealmObject.set(this, 'name', name);
    RealmObject.set<RealmList<Person>>(this, 'crew', RealmList<Person>(crew));
  }

  Team._();

  @override
  String get name => RealmObject.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObject.set(this, 'name', value);

  @override
  RealmList<Person> get crew =>
      RealmObject.get<Person>(this, 'crew') as RealmList<Person>;
  @override
  set crew(covariant RealmList<Person> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<Team>> get changes =>
      RealmObject.getChanges<Team>(this);

  @override
  Team freeze() => RealmObject.freezeObject<Team>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Team._);
    return const SchemaObject(Team, 'Team', [
      SchemaProperty('name', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('crew', RealmPropertyType.object,
          linkTarget: 'Person', collectionType: RealmCollectionType.list),
    ]);
  }
}
