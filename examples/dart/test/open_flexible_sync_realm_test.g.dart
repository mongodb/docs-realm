// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'open_flexible_sync_realm_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Tricycle extends _Tricycle
    with RealmEntity, RealmObjectBase, RealmObject {
  Tricycle(
    int id,
    String name,
  ) {
    RealmObjectBase.set(this, '_id', id);
    RealmObjectBase.set(this, 'name', name);
  }

  Tricycle._();

  @override
  int get id => RealmObjectBase.get<int>(this, '_id') as int;
  @override
  set id(int value) => RealmObjectBase.set(this, '_id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  Stream<RealmObjectChanges<Tricycle>> get changes =>
      RealmObjectBase.getChanges<Tricycle>(this);

  @override
  Tricycle freeze() => RealmObjectBase.freezeObject<Tricycle>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Tricycle._);
    return const SchemaObject(ObjectType.realmObject, Tricycle, 'Tricycle', [
      SchemaProperty('_id', RealmPropertyType.int,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
    ]);
  }
}
