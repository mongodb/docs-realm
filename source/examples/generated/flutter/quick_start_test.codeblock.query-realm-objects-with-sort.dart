realm.write(() {
  realm.add(Car('BMW', 'Z4', miles: 42));
  realm.add(Car('Audi', 'A8', miles: 99));
  realm.add(Car('Mercedes', 'G-Wagon', miles: 2));
});
final sortedCars = realm.query<Car>('TRUEPREDICATE SORT(model ASC)');
for (var car in sortedCars) {
  print(car.model);
}
// prints 'A8', 'G-Wagon', 'Z4'
