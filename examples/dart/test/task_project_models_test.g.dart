// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'task_project_models_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class Item extends _Item with RealmEntity, RealmObjectBase, RealmObject {
  static var _defaultsSet = false;

  Item(
    ObjectId id,
    String name, {
    bool isComplete = false,
    String? assignee,
    int priority = 0,
    int progressMinutes = 0,
  }) {
    if (!_defaultsSet) {
      _defaultsSet = RealmObjectBase.setDefaults<Item>({
        'isComplete': false,
        'priority': 0,
        'progressMinutes': 0,
      });
    }
    RealmObjectBase.set(this, '_id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'isComplete', isComplete);
    RealmObjectBase.set(this, 'assignee', assignee);
    RealmObjectBase.set(this, 'priority', priority);
    RealmObjectBase.set(this, 'progressMinutes', progressMinutes);
  }

  Item._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, '_id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, '_id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  bool get isComplete => RealmObjectBase.get<bool>(this, 'isComplete') as bool;
  @override
  set isComplete(bool value) => RealmObjectBase.set(this, 'isComplete', value);

  @override
  String? get assignee =>
      RealmObjectBase.get<String>(this, 'assignee') as String?;
  @override
  set assignee(String? value) => RealmObjectBase.set(this, 'assignee', value);

  @override
  int get priority => RealmObjectBase.get<int>(this, 'priority') as int;
  @override
  set priority(int value) => RealmObjectBase.set(this, 'priority', value);

  @override
  int get progressMinutes =>
      RealmObjectBase.get<int>(this, 'progressMinutes') as int;
  @override
  set progressMinutes(int value) =>
      RealmObjectBase.set(this, 'progressMinutes', value);

  @override
  Stream<RealmObjectChanges<Item>> get changes =>
      RealmObjectBase.getChanges<Item>(this);

  @override
  Item freeze() => RealmObjectBase.freezeObject<Item>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Item._);
    return const SchemaObject(ObjectType.realmObject, Item, 'Item', [
      SchemaProperty('id', RealmPropertyType.objectid,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('isComplete', RealmPropertyType.bool),
      SchemaProperty('assignee', RealmPropertyType.string, optional: true),
      SchemaProperty('priority', RealmPropertyType.int),
      SchemaProperty('progressMinutes', RealmPropertyType.int),
    ]);
  }
}

class Project extends _Project with RealmEntity, RealmObjectBase, RealmObject {
  Project(
    ObjectId id,
    String name, {
    int? quota,
    Iterable<Item> items = const [],
  }) {
    RealmObjectBase.set(this, '_id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'quota', quota);
    RealmObjectBase.set<RealmList<Item>>(this, 'items', RealmList<Item>(items));
  }

  Project._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, '_id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, '_id', value);

  @override
  String get name => RealmObjectBase.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObjectBase.set(this, 'name', value);

  @override
  RealmList<Item> get items =>
      RealmObjectBase.get<Item>(this, 'items') as RealmList<Item>;
  @override
  set items(covariant RealmList<Item> value) =>
      throw RealmUnsupportedSetError();

  @override
  int? get quota => RealmObjectBase.get<int>(this, 'quota') as int?;
  @override
  set quota(int? value) => RealmObjectBase.set(this, 'quota', value);

  @override
  Stream<RealmObjectChanges<Project>> get changes =>
      RealmObjectBase.getChanges<Project>(this);

  @override
  Project freeze() => RealmObjectBase.freezeObject<Project>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Project._);
    return const SchemaObject(ObjectType.realmObject, Project, 'Project', [
      SchemaProperty('id', RealmPropertyType.objectid,
          mapTo: '_id', primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('items', RealmPropertyType.object,
          linkTarget: 'Item', collectionType: RealmCollectionType.list),
      SchemaProperty('quota', RealmPropertyType.int, optional: true),
    ]);
  }
}
