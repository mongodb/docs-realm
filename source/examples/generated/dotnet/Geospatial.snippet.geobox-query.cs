var companiesInBox1 = realm.All<Company>()
    .Where(c => QueryMethods.GeoWithin(c.Location, box1));

var companiesInBox2 = realm.All<Company>()
    .Filter("Location geoWithin $0", box2);
