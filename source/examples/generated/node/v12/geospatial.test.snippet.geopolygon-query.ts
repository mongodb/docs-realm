const companiesInBasicPolygon = realm
  .objects(Company)
  .filtered("location geoWithin $0", basicPolygon);
console.debug(
  `Companies in large circle: ${companiesInBasicPolygon.length}`
);

const companiesInPolygonWithTwoHoles = realm
  .objects(Company)
  .filtered("location geoWithin $0", polygonWithTwoHoles);
console.debug(
  `Companies in small circle: ${companiesInPolygonWithTwoHoles.length}`
);
