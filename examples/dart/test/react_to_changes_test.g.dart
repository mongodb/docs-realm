// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'react_to_changes_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Character extends _Character with RealmEntity, RealmObject {
  Character(
    String name,
    String species,
    int age,
  ) {
    RealmObject.set(this, 'name', name);
    RealmObject.set(this, 'species', species);
    RealmObject.set(this, 'age', age);
  }

  Character._();

  @override
  String get name => RealmObject.get<String>(this, 'name') as String;
  @override
  set name(String value) => throw RealmUnsupportedSetError();

  @override
  String get species => RealmObject.get<String>(this, 'species') as String;
  @override
  set species(String value) => RealmObject.set(this, 'species', value);

  @override
  int get age => RealmObject.get<int>(this, 'age') as int;
  @override
  set age(int value) => RealmObject.set(this, 'age', value);

  @override
  Stream<RealmObjectChanges<Character>> get changes =>
      RealmObject.getChanges<Character>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Character._);
    return const SchemaObject(Character, [
      SchemaProperty('name', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('species', RealmPropertyType.string),
      SchemaProperty('age', RealmPropertyType.int),
    ]);
  }
}

class Fellowship extends _Fellowship with RealmEntity, RealmObject {
  Fellowship(
    String name, {
    Iterable<Character> members = const [],
  }) {
    RealmObject.set(this, 'name', name);
    RealmObject.set<RealmList<Character>>(
        this, 'members', RealmList<Character>(members));
  }

  Fellowship._();

  @override
  String get name => RealmObject.get<String>(this, 'name') as String;
  @override
  set name(String value) => throw RealmUnsupportedSetError();

  @override
  RealmList<Character> get members =>
      RealmObject.get<Character>(this, 'members') as RealmList<Character>;
  @override
  set members(covariant RealmList<Character> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<Fellowship>> get changes =>
      RealmObject.getChanges<Fellowship>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Fellowship._);
    return const SchemaObject(Fellowship, [
      SchemaProperty('name', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('members', RealmPropertyType.object,
          linkTarget: 'Character', collectionType: RealmCollectionType.list),
    ]);
  }
}
