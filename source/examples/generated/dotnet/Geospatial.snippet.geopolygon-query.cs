var companiesInBasicPolygon = realm.All<Company>()
    .Where(c => QueryMethods.GeoWithin(c.Location, basicPolygon));
// companiesInBasicPolygon.Count() == 2

var companiesInPolygon = realm.All<Company>()
    .Where(c => QueryMethods.GeoWithin(c.Location, polygonWithTwoHoles));
// companiesInPolygon.Count() == 1
