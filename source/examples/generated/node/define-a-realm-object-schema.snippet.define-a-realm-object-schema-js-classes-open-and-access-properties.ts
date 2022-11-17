const realm = await Realm.open({
  path: "myrealm",
  schema: [Car],
});

let car1: Car;
realm.write(() => {
  // call to new Car() creates a new "Car" Realm.Object
  car1 = new Car(realm, "Nissan", "Sentra", 20510);
  // :hide-start:
  expect(car1.model).toBe("Sentra");
  // :hide-end:
});
