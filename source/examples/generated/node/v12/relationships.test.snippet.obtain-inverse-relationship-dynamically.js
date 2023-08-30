// Get the Manufacturer who makes the Car
const carObjects = realm.objects(Car);
const linkedManufacturer = carObjects[0].linkingObjects(
  "Manufacturer",
  "cars"
)[0];
expect(linkedManufacturer.name).toBe("Nissan");
