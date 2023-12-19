// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'geospatial_data_test.dart';

// **************************************************************************
// RealmObjectGenerator
// **************************************************************************

// ignore_for_file: type=lint
class MyGeoPoint extends _MyGeoPoint
    with RealmEntity, RealmObjectBase, EmbeddedObject {
  static var _defaultsSet = false;

  MyGeoPoint({
    String type = 'Point',
    Iterable<double> coordinates = const [],
  }) {
    if (!_defaultsSet) {
      _defaultsSet = RealmObjectBase.setDefaults<MyGeoPoint>({
        'type': 'Point',
      });
    }
    RealmObjectBase.set(this, 'type', type);
    RealmObjectBase.set<RealmList<double>>(
        this, 'coordinates', RealmList<double>(coordinates));
  }

  MyGeoPoint._();

  @override
  String get type => RealmObjectBase.get<String>(this, 'type') as String;

  @override
  RealmList<double> get coordinates =>
      RealmObjectBase.get<double>(this, 'coordinates') as RealmList<double>;
  @override
  set coordinates(covariant RealmList<double> value) =>
      throw RealmUnsupportedSetError();

  @override
  Stream<RealmObjectChanges<MyGeoPoint>> get changes =>
      RealmObjectBase.getChanges<MyGeoPoint>(this);

  @override
  MyGeoPoint freeze() => RealmObjectBase.freezeObject<MyGeoPoint>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(MyGeoPoint._);
    return const SchemaObject(
        ObjectType.embeddedObject, MyGeoPoint, 'MyGeoPoint', [
      SchemaProperty('type', RealmPropertyType.string),
      SchemaProperty('coordinates', RealmPropertyType.double,
          collectionType: RealmCollectionType.list),
    ]);
  }
}

class Company extends _Company with RealmEntity, RealmObjectBase, RealmObject {
  Company(
    ObjectId id, {
    MyGeoPoint? location,
  }) {
    RealmObjectBase.set(this, 'id', id);
    RealmObjectBase.set(this, 'location', location);
  }

  Company._();

  @override
  ObjectId get id => RealmObjectBase.get<ObjectId>(this, 'id') as ObjectId;
  @override
  set id(ObjectId value) => RealmObjectBase.set(this, 'id', value);

  @override
  MyGeoPoint? get location =>
      RealmObjectBase.get<MyGeoPoint>(this, 'location') as MyGeoPoint?;
  @override
  set location(covariant MyGeoPoint? value) =>
      RealmObjectBase.set(this, 'location', value);

  @override
  Stream<RealmObjectChanges<Company>> get changes =>
      RealmObjectBase.getChanges<Company>(this);

  @override
  Company freeze() => RealmObjectBase.freezeObject<Company>(this);

  static SchemaObject get schema => _schema ??= _initSchema();
  static SchemaObject? _schema;
  static SchemaObject _initSchema() {
    RealmObjectBase.registerFactory(Company._);
    return const SchemaObject(ObjectType.realmObject, Company, 'Company', [
      SchemaProperty('id', RealmPropertyType.objectid, primaryKey: true),
      SchemaProperty('location', RealmPropertyType.object,
          optional: true, linkTarget: 'MyGeoPoint'),
    ]);
  }
}
