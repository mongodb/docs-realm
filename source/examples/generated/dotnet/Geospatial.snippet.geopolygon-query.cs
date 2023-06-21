var companiesInBasicPolygon = realm.All<Company>()
    .Where(c => QueryMethods.GeoWithin(c.Location, basicPolygon));

var companiesInPolygon = realm.All<Company>()
    .Filter("Location geoWithin $0", polygonWithTwoHoles);
