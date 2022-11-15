realm.write(() {
  realm.add(Car(6, 'BMW', model: 'Z4', miles: 42));
  realm.add(Car(7, 'Audi', model: 'A8', miles: 99));
  realm.add(Car(8, 'Mercedes', model: 'G-Wagon', miles: 2));
});
final sortedCars = realm.query<Car>('TRUEPREDICATE SORT(model ASC)');
for (var car in sortedCars) {
  print(car.model);
}
// prints 'A8', 'G-Wagon', 'Z4'
