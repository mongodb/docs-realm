// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'react_to_changes_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Character extends _Character
    with RealmEntity, RealmObjectBase, RealmObject {
  Character(
    String name,
    String species,
    int age,
  ) {
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'species', species);
    RealmObjectBase.set(this, 'age', age);
  }

  Character._();

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  String get species => RealmObjectBase.get<String>(this, 'species') as String;
  @override
  set species(String value) => RealmObjectBase.set(this, 'species', value);

  @override
  int get age => RealmObjectBase.get<int>(this, 'age') as int;
  @override
  set age(int value) => RealmObjectBase.set(this, 'age', value);

  @override
  Stream<RealmObjectChanges<Character>> get changes =>
      RealmObjectBase.getChanges<Character>(this);

  @override
  Character freeze() => RealmObjectBase.freezeObject<Character>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Character._);
    return const SchemaObject(ObjectType.realmObject, Character, 'Character', [
      SchemaProperty('name', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('species', RealmPropertyType.string),
      SchemaProperty('age', RealmPropertyType.int),
    ]);
  }
}

class Fellowship extends _Fellowship
    with RealmEntity, RealmObjectBase, RealmObject {
  Fellowship(
    String name, {
    Iterable<Character> members = const [],
  }) {
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set<RealmList<Character>>(
        this, 'members', RealmList<Character>(members));
  }

  Fellowship._();

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  RealmList<Character> get members =>
      RealmObjectBase.get<Character>(this, 'members') as RealmList<Character>;
  @override
  set members(covariant RealmList<Character> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<Fellowship>> get changes =>
      RealmObjectBase.getChanges<Fellowship>(this);

  @override
  Fellowship freeze() => RealmObjectBase.freezeObject<Fellowship>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Fellowship._);
    return const SchemaObject(
        ObjectType.realmObject, Fellowship, 'Fellowship', [
      SchemaProperty('name', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('members', RealmPropertyType.object,
          linkTarget: 'Character', collectionType: RealmCollectionType.list),
    ]);
  }
}
