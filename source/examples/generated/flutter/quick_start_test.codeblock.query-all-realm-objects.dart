var cars = realm.all<Car>();
var myCar = cars[0];
print('My car is ${myCar.make} ${myCar.model}');
