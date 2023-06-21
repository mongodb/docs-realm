var testCircle = new GeoCircle((47.8, -122.6), Distance.FromKilometers(44.4));
var matches = realm.All<Company>().Where(c => QueryMethods.GeoWithin(c.Location, testCircle));
