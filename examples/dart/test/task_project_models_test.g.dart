// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'task_project_models_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class Task extends _Task with RealmEntity, RealmObject {
  static var _defaultsSet = false;

  Task(
    int id,
    String name, {
    bool isComplete = false,
    String? assignee,
    int priority = 0,
    int progressMinutes = 0,
  }) {
    if (!_defaultsSet) {
      _defaultsSet = RealmObject.setDefaults<Task>({
        'isComplete': false,
        'priority': 0,
        'progressMinutes': 0,
      });
    }
    RealmObject.set(this, 'id', id);
    RealmObject.set(this, 'name', name);
    RealmObject.set(this, 'isComplete', isComplete);
    RealmObject.set(this, 'assignee', assignee);
    RealmObject.set(this, 'priority', priority);
    RealmObject.set(this, 'progressMinutes', progressMinutes);
  }

  Task._();

  @override
  int get id => RealmObject.get<int>(this, 'id') as int;
  @override
  set id(int value) => throw RealmUnsupportedSetError();

  @override
  String get name => RealmObject.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObject.set(this, 'name', value);

  @override
  bool get isComplete => RealmObject.get<bool>(this, 'isComplete') as bool;
  @override
  set isComplete(bool value) => RealmObject.set(this, 'isComplete', value);

  @override
  String? get assignee => RealmObject.get<String>(this, 'assignee') as String?;
  @override
  set assignee(String? value) => RealmObject.set(this, 'assignee', value);

  @override
  int get priority => RealmObject.get<int>(this, 'priority') as int;
  @override
  set priority(int value) => RealmObject.set(this, 'priority', value);

  @override
  int get progressMinutes =>
      RealmObject.get<int>(this, 'progressMinutes') as int;
  @override
  set progressMinutes(int value) =>
      RealmObject.set(this, 'progressMinutes', value);

  @override
  Stream<RealmObjectChanges<Task>> get changes =>
      RealmObject.getChanges<Task>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Task._);
    return const SchemaObject(Task, [
      SchemaProperty('id', RealmPropertyType.int, primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('isComplete', RealmPropertyType.bool),
      SchemaProperty('assignee', RealmPropertyType.string, optional: true),
      SchemaProperty('priority', RealmPropertyType.int),
      SchemaProperty('progressMinutes', RealmPropertyType.int),
    ]);
  }
}

class Project extends _Project with RealmEntity, RealmObject {
  Project(
    int id,
    String name, {
    int? quota,
    Iterable<Task> tasks = const [],
  }) {
    RealmObject.set(this, 'id', id);
    RealmObject.set(this, 'name', name);
    RealmObject.set(this, 'quota', quota);
    RealmObject.set<RealmList<Task>>(this, 'tasks', RealmList<Task>(tasks));
  }

  Project._();

  @override
  int get id => RealmObject.get<int>(this, 'id') as int;
  @override
  set id(int value) => throw RealmUnsupportedSetError();

  @override
  String get name => RealmObject.get<String>(this, 'name') as String;
  @override
  set name(String value) => RealmObject.set(this, 'name', value);

  @override
  RealmList<Task> get tasks =>
      RealmObject.get<Task>(this, 'tasks') as RealmList<Task>;
  @override
  set tasks(covariant RealmList<Task> value) =>
      throw RealmUnsupportedSetError();

  @override
  int? get quota => RealmObject.get<int>(this, 'quota') as int?;
  @override
  set quota(int? value) => RealmObject.set(this, 'quota', value);

  @override
  Stream<RealmObjectChanges<Project>> get changes =>
      RealmObject.getChanges<Project>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObject.registerFactory(Project._);
    return const SchemaObject(Project, [
      SchemaProperty('id', RealmPropertyType.int, primaryKey: true),
      SchemaProperty('name', RealmPropertyType.string),
      SchemaProperty('tasks', RealmPropertyType.object,
          linkTarget: 'Task', collectionType: RealmCollectionType.list),
      SchemaProperty('quota', RealmPropertyType.int, optional: true),
    ]);
  }
}
