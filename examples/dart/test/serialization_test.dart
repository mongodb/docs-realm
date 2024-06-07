import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'utils.dart';

import './pet.dart';

@RealmModel()
class _ {
  @PrimaryKey()
  late ObjectId id;

  String? licensePlate;
  bool isElectric = false;
  double milesDriven = 0;
  late List<String> attributes;
  late _Person? owner;
}

main() {
  test('data types', () {

    List dartList = ['dog', 'cat'];

    // include ex of a one to one relation (mapping to an object)

  });

  test('serialize', () {

    final config = Configuration.local([Pet.schema]);
    final realm = Realm(config);

    // create pet spider object
    final spider = Pet('Jumping Spider', 8, DateTime.utc(2024, 4, 10));

    realm.write(() {
      realm.add(spider);
    });

    // :snippet-start: serialize
    // Pass the object as a parameter to the method
    EJsonValue serializeByParam = toEJson(spider);

    // Call the method directly on the object
    EJsonValue serializeWithCall = spider.toEJson();
    // :snippet-end:

    print(serializeByParam);

    final birthDate = DateTime.utc(2024, 4, 10);

    // make sure serialized value matches expected
    expect(serializeByParam, {
      'type': 'Jumping Spider',
      'numberOfLegs': {'\$numberInt': '8'},
      'birthDate': {
        '\$date': {'\$numberLong': birthDate.millisecondsSinceEpoch.toString()}
      },
      'price': null,
    });

    // make sure two methods of serialization match
    expect(serializeByParam, serializeWithCall);

    cleanUpRealm(realm);
  });

  test('deserialize', () {

    final config = Configuration.local([Pet.schema]);
    final realm = Realm(config);

    // create pet spider object
    final spider = Pet('Jumping Spider', 8, DateTime.utc(2024, 4, 10));

    realm.write(() {
      realm.add(spider);
    });

    // Pass the object as a parameter to the method
    EJsonValue serializeByParam = toEJson(spider);

    // :snippet-start: deserialize
    // Pass the serialized object to the method
    final deserializeFromEjsonWithExplicitType = fromEJson<Pet>(serializeByParam);

    // The method can also infer the object type
    Pet deserializeFromEjson = fromEJson(serializeByParam);
    // :snippet-end: 

    print(deserializeFromEjson);

    // make sure deserialized returns proper instance of Pet object
    expect(deserializeFromEjson.type, spider.type);

    cleanUpRealm(realm);
  });
}
