import 'models/car.dart';
import 'package:realm_dart/realm.dart';

void main(List<String> arguments) {
  var config = Configuration.local([Car.schema]);
  var realm = Realm(config);

  print('Creating Realm object of type Car');
  Car car = realm.write<Car>(() {
    return realm.add(Car("Audi", model: 'A8'));
  });
  print('The car is ${car.make}');
  realm.write(() {
    car.model = "A6";
  });
  print("The car is ${car.make}");

  var objects = realm.all<Car>();
  var indexedCar = objects[0];
  print('The indexedCar is ${indexedCar.make}');

  print("Done");
  realm.close();
  Realm.deleteRealm(config.path);
  Realm.shutdown();
}
