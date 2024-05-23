import 'package:test/test.dart';
import 'package:realm_dart/realm.dart';
import 'utils.dart';

part 'serialization_test.realm.dart';

@RealmModel()
class _Pet {
  late String type;
  late int numberOfLegs;
  late DateTime birthDate;

  late double? price;
}

main() {
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

  print(serializeWithCall);

  test('serialize', () {
    print(serializeByParam);

    EJsonValue different = spider.toEJson();
    print(different);

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
  });

  test('deserialize', () {
    // :snippet-start: deserialize
    // Pass the serialized object to the method
    Pet deserializeFromEjson = fromEJson(serializeByParam);
    // :snippet-end: 

    print(deserializeFromEjson);

    // make sure deserialized returns proper instance of Pet object
    expect(deserializeFromEjson.type, spider.type);

  });
}
