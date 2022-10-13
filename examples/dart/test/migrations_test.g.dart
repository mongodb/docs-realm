// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'migrations_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class PersonV2 extends _PersonV2 with RealmEntity, RealmObject {
  PersonV2(
    ObjectId id,
    String fullName, {
    int? yearsSinceBirth,
  }) {
    RealmObject.set(this, 'id', id);
    RealmObject.set(this, 'fullName', fullName);
    RealmObject.set(this, 'yearsSinceBirth', yearsSinceBirth);
  }

  PersonV2._();

  @override
  ObjectId get id => RealmObject.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObject.set(this, 'id', value);

  @override
  String get fullName => RealmObject.get<String>(this, 'fullName') as String;
  @override
  set fullName(String value) => RealmObject.set(this, 'fullName', value);

  @override
  int? get yearsSinceBirth =>
      RealmObject.get<int>(this, 'yearsSinceBirth') as int?;
  @override
  set yearsSinceBirth(int? value) =>
      RealmObject.set(this, 'yearsSinceBirth', value);

  @override
  Stream<RealmObjectChanges<PersonV2>> get changes =>
      RealmObject.getChanges<PersonV2>(this);

  @override
  PersonV2 freeze() => RealmObject.freezeObject<PersonV2>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(PersonV2._);
    return const SchemaObject(PersonV2, 'Person', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('fullName', RealmPropertyType.string),
      SchemaProperty('yearsSinceBirth', RealmPropertyType.int, optional: true),
    ]);
  }
}
