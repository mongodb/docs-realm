// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'migrations_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class PersonV2 extends _PersonV2
    with RealmEntity, RealmObjectBase, RealmObject {
  PersonV2(
    String id,
    String fullName, {
    int? yearsSinceBirth,
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'fullName', fullName);
    RealmObjectBase.set(this, 'yearsSinceBirth', yearsSinceBirth);
  }

  PersonV2._();

  @override
  String get id => RealmObjectBase.get<String>(this, 'id') as String;
  @override
  set id(String value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get fullName =>
      RealmObjectBase.get<String>(this, 'fullName') as String;
  @override
  set fullName(String value) => RealmObjectBase.set(this, 'fullName', value);

  @override
  int? get yearsSinceBirth =>
      RealmObjectBase.get<int>(this, 'yearsSinceBirth') as int?;
  @override
  set yearsSinceBirth(int? value) =>
      RealmObjectBase.set(this, 'yearsSinceBirth', value);

  @override
  Stream<RealmObjectChanges<PersonV2>> get changes =>
      RealmObjectBase.getChanges<PersonV2>(this);

  @override
  PersonV2 freeze() => RealmObjectBase.freezeObject<PersonV2>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(PersonV2._);
    return const SchemaObject(ObjectType.realmObject, PersonV2, 'Person', [
      SchemaProperty('id', RealmPropertyType.string, primaryKey: true),
      SchemaProperty('fullName', RealmPropertyType.string),
      SchemaProperty('yearsSinceBirth', RealmPropertyType.int, optional: true),
    ]);
  }
}
