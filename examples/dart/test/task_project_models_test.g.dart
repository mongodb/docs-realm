// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'task_project_models_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Task extends _Task with RealmEntity, RealmObjectBase, RealmObject {
  static var _defaultsSet = false;

  Task(
    ObjectId id,
    String name, {
    bool isComplete = false,
    String? assignee,
    int priority = 0,
    int progressMinutes = 0,
  }) {
    if (!_defaultsSet) {
      _defaultsSet = RealmObjectBase.setDefaults<Task>({
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

  Task._();

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
  Stream<RealmObjectChanges<Task>> get changes =>
      RealmObjectBase.getChanges<Task>(this);

  @override
  Task freeze() => RealmObjectBase.freezeObject<Task>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Task._);
    return const SchemaObject(ObjectType.realmObject, Task, 'Task', [
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
    Iterable<Task> tasks = const [],
  }) {
    RealmObjectBase.set(this, '_id', id);
    RealmObjectBase.set(this, 'name', name);
    RealmObjectBase.set(this, 'quota', quota);
    RealmObjectBase.set<RealmList<Task>>(this, 'tasks', RealmList<Task>(tasks));
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
  RealmList<Task> get tasks =>
      RealmObjectBase.get<Task>(this, 'tasks') as RealmList<Task>;
  @override
  set tasks(covariant RealmList<Task> value) =>
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
      SchemaProperty('tasks', RealmPropertyType.object,
          linkTarget: 'Task', collectionType: RealmCollectionType.list),
      SchemaProperty('quota', RealmPropertyType.int, optional: true),
    ]);
  }
}
