// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'rug.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Rug extends _Rug with RealmEntity, RealmObjectBase, RealmObject {
  Rug(
    ObjectId id,
    String pattern,
    String material,
    int softness,
  ) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'pattern', pattern);
    RealmObjectBase.set(this, 'material', material);
    RealmObjectBase.set(this, 'softness', softness);
  }

  Rug._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get pattern => RealmObjectBase.get<String>(this, 'pattern') as String;
  @override
  set pattern(String value) => RealmObjectBase.set(this, 'pattern', value);

  @override
  String get material =>
      RealmObjectBase.get<String>(this, 'material') as String;
  @override
  set material(String value) => RealmObjectBase.set(this, 'material', value);

  @override
  int get softness => RealmObjectBase.get<int>(this, 'softness') as int;
  @override
  set softness(int value) => RealmObjectBase.set(this, 'softness', value);

  @override
  Stream<RealmObjectChanges<Rug>> get changes =>
      RealmObjectBase.getChanges<Rug>(this);

  @override
  Rug freeze() => RealmObjectBase.freezeObject<Rug>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Rug._);
    return const SchemaObject(ObjectType.realmObject, Rug, 'Rug', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('pattern', RealmPropertyType.string,
          indexType: RealmIndexType.fullText),
      SchemaProperty('material', RealmPropertyType.string,
          indexType: RealmIndexType.fullText),
      SchemaProperty('softness', RealmPropertyType.int),
    ]);
  }
}
