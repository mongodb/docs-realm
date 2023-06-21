
// Query using LINQ
var companiesInBox1 = realm.All<Company>().Where(c => QueryMethods.GeoWithin(c.Location, box1));
// query1.Count() == 1

// Query using RQL
var companiesInBox2 = realm.All<Company>().Filter("Location geoWithin $0", box2);
// query2.Count() == 2
