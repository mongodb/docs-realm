const realm = await Realm.open({
  path: "myrealm",
  schema: [Car],
});

let car1!: Car;
realm.write(() => {
  // call to new Car() creates a new "Car" Realm.Object
  car1 = new Car(realm, { make: "Nissan", model: "Sentra", miles: 20510 });
});
console.log(car1.make)
