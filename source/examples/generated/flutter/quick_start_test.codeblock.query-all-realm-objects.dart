var cars = realm.objects<Car>();
var myCar = cars[0];
print('My car is ${myCar.make} ${myCar.model}');
