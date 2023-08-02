const companiesInLargeCircle = realm
  .objects(Company)
  .filtered("location geoWithin $0", largeCircle);
console.log("Companies in large circle: ${companiesInLargeCircle.length}");

const companiesInSmallCircle = realm
  .objects(Company)
  .filtered("location geoWithin $0", smallCircle);
console.log("Companies in small circle: ${companiesInSmallCircle.length}");
