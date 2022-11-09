const realm = await Realm.open({
  path: "myrealm",
  schema: [Car],
});

let car1;
realm.write(() => {
  // call to new Car() creates a new "Car" Realm.Object
  car1 = new Car(realm, { make: "Nissan", model: "Sentra", miles: 20510 }) 
});
console.log(car1.carName);
// use car1
