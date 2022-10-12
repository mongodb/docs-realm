// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'sync_schemas.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Todo extends _Todo with RealmEntity, RealmObject {
  static var _defaultsSet = false;

  Todo(
    ObjectId id,
    String summary,
    String ownerId, {
    bool isComplete = false,
  }) {
    if (!_defaultsSet) {
      _defaultsSet = RealmObject.setDefaults<Todo>({
        'isComplete': false,
      });
    }
    RealmObject.set(this, '_id', id);
    RealmObject.set(this, 'isComplete', isComplete);
    RealmObject.set(this, 'summary', summary);
    RealmObject.set(this, 'owner_id', ownerId);
  }

  Todo._();

  @override
  ObjectId get id => RealmObject.get<ObjectId>(this, '_id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObject.set(this, '_id', value);

  @override
  bool get isComplete => RealmObject.get<bool>(this, 'isComplete') as bool;
  @override
  set isComplete(bool value) => RealmObject.set(this, 'isComplete', value);

  @override
  String get summary => RealmObject.get<String>(this, 'summary') as String;
  @override
  set summary(String value) => RealmObject.set(this, 'summary', value);

  @override
  String get ownerId => RealmObject.get<String>(this, 'owner_id') as String;
  @override
  set ownerId(String value) => RealmObject.set(this, 'owner_id', value);

  @override
  Stream<RealmObjectChanges<Todo>> get changes =>
      RealmObject.getChanges<Todo>(this);

  @override
  Todo freeze() => RealmObject.freezeObject<Todo>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Todo._);
    return const SchemaObject(Todo, 'Todo', [
      SchemaProperty('_id', RealmPropertyType.objectid,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('isComplete', RealmPropertyType.bool),
      SchemaProperty('summary', RealmPropertyType.string),
      SchemaProperty('owner_id', RealmPropertyType.string, mapTo: 'owner_id'),
    ]);
  }
}
