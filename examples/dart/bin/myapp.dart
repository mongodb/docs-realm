import 'models/car.dart';
import 'package:realm_dart/realm.dart';

void main(List<String> arguments) {
  // :snippet-start: create-bundle
  print("Bundling realm");
  final config = Configuration.local([Car.schema], path: 'bundle.realm');
  final realm = Realm(config);

  realm.write(() => realm.deleteAll<Car>()); // :remove:
  realm.write(() {
    realm.add(Car(ObjectId(), "Audi", model: 'A8'));
    realm.add(Car(ObjectId(), "Mercedes", model: 'G Wagon'));
  });
  print("Bundled realm location: " + realm.config.path);
  realm.close();
  // :snippet-end:

  Realm.shutdown();
}
