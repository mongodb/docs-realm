// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'open_flexible_sync_realm_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Tricycle extends _Tricycle with RealmEntity, RealmObject {
  Tricycle(
    int id,
    String name,
  ) {
    RealmObject.set(this, '_id', id);
    RealmObject.set(this, 'name', name);
  }

  Tricycle._();

  @override
  int get id => RealmObject.get<int>(this, '_id') as int;
  @override
  set id(int value) => RealmObject.set(this, '_id', value);

  @override
  String get name => RealmObject.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObject.set(this, 'name', value);

  @override
  Stream<RealmObjectChanges<Tricycle>> get changes =>
      RealmObject.getChanges<Tricycle>(this);

  @override
  Tricycle freeze() => RealmObject.freezeObject<Tricycle>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Tricycle._);
    return const SchemaObject(Tricycle, 'Tricycle', [
      SchemaProperty('_id', RealmPropertyType.int,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
    ]);
  }
}
