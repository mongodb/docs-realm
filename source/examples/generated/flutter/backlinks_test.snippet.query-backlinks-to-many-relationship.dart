// Scooters have a to-many relationship with ScooterShops
final scooters = realm.query<Scooter>("name == 'Scooterbug'").first;

// Find all ScooterShops that sell the Scooterbug
final shops = scooters.getBacklinks<ScooterShop>('scooters');

