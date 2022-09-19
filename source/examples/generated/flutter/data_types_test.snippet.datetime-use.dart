final config = Configuration.local([Vehicle.schema]);
final realm = Realm(config);

Vehicle subaruOutback = realm.write<Vehicle>(() {
  // Create a Realm object with date in UTC, or convert with .toUtc() before storing
  return realm.add(Vehicle('Subie', DateTime.utc(2022, 9, 18, 12, 30, 0)));
});

// When you query the object, the `DateTime` returned is UTC
final queriedSubaruOutback =
    realm.all<Vehicle>().query('nickname == "Subie"').first;

// If your app needs it, convert it to Local() or the desired time zone
final localizedSubieDateLastServiced =
    queriedSubaruOutback.dateLastServiced.toLocal();

realm.close();
