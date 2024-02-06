// Persons have a to-one relationship with Bikes
final person = realm.query<Person>("firstName == 'Anakin'").first;

// Find all Bikes that have an Owner named 'Anakin'
final allBikes = person.getBacklinks<Bike>('owner');
