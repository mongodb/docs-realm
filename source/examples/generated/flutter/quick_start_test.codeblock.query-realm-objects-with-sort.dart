realm.write(() {
  realm.add(Car('BMW', 'Z4', miles: 42));
  realm.add(Car('Audi', 'A8', miles: 99));
  realm.add(Car('Mercedes', 'G-Wagon', miles: 2));
});
// TODO(DOCSP-20150): validate that this works as expected..i'm uncertain on how sort works
final sortedCars = realm.query<Car>('TRUEPREDICATE SORT(model ASC)');
for (var car in sortedCars) {
  print(car.model);
}
// prints 'A8', 'G-Wagon', 'Z4'
