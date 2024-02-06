final person = realm.query<Person>("firstName == 'Anakin'").first;

// Find all bikes that have an owner named Anakin
final allBikes = person.getBacklinks<Bike>('owner');
