// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'backlinks_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

class User extends _User with RealmEntity, RealmObjectBase, RealmObject {
  User(
    int id,
    String username, {
    Iterable<Task> tasks = const [],
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'username', username);
    RealmObjectBase.set<RealmList<Task>>(this, 'tasks', RealmList<Task>(tasks));
  }

  User._();

  @override
  int get id => RealmObjectBase.get<int>(this, 'id') as int;
  @override
  set id(int value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get username =>
      RealmObjectBase.get<String>(this, 'username') as String;
  @override
  set username(String value) => RealmObjectBase.set(this, 'username', value);

  @override
  RealmList<Task> get tasks =>
      RealmObjectBase.get<Task>(this, 'tasks') as RealmList<Task>;
  @override
  set tasks(covariant RealmList<Task> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<User>> get changes =>
      RealmObjectBase.getChanges<User>(this);

  @override
  User freeze() => RealmObjectBase.freezeObject<User>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(User._);
    return const SchemaObject(ObjectType.realmObject, User, 'User', [
      SchemaProperty('id', RealmPropertyType.int, primaryKey: true),
      SchemaProperty('username', RealmPropertyType.string),
      SchemaProperty('tasks', RealmPropertyType.object,
          linkTarget: 'Task', collectionType: RealmCollectionType.list),
    ]);
  }
}

class Task extends _Task with RealmEntity, RealmObjectBase, RealmObject {
  Task(
    int id,
    String description,
    bool isComplete,
  ) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'description', description);
    RealmObjectBase.set(this, 'isComplete', isComplete);
  }

  Task._();

  @override
  int get id => RealmObjectBase.get<int>(this, 'id') as int;
  @override
  set id(int value) => RealmObjectBase.set(this, 'id', value);

  @override
  String get description =>
      RealmObjectBase.get<String>(this, 'description') as String;
  @override
  set description(String value) =>
      RealmObjectBase.set(this, 'description', value);

  @override
  bool get isComplete => RealmObjectBase.get<bool>(this, 'isComplete') as bool;
  @override
  set isComplete(bool value) => RealmObjectBase.set(this, 'isComplete', value);

  @override
  RealmResults<User> get linkedUser =>
      RealmObjectBase.get<User>(this, 'linkedUser') as RealmResults<User>;
  @override
  set linkedUser(covariant RealmResults<User> value) =>
      throw RealmUnsupportedSetError();

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
      SchemaProperty('id', RealmPropertyType.int, primaryKey: true),
      SchemaProperty('description', RealmPropertyType.string),
      SchemaProperty('isComplete', RealmPropertyType.bool),
      SchemaProperty('linkedUser', RealmPropertyType.linkingObjects,
          linkOriginProperty: 'tasks',
          collectionType: RealmCollectionType.list,
          linkTarget: 'User'),
    ]);
  }
}
