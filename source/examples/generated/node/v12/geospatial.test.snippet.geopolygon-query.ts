const companiesInBasicPolygon = realm
  .objects(Company)
  .filtered("location geoWithin $0", basicPolygon);
console.log("Companies in large circle: ${companiesInBasicPolygon.length}");

const companiesInPolygonWithTwoHoles = realm
  .objects(Company)
  .filtered("location geoWithin $0", polygonWithTwoHoles);
console.log(
  "Companies in small circle: ${companiesInPolygonWithTwoHoles.length}"
);
