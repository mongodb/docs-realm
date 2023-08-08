const companiesInLargeCircle = realm
  .objects(Company)
  .filtered("location geoWithin $0", largeCircle);
console.debug(
  `Companies in large circle: ${companiesInLargeCircle.length}`
);

const companiesInSmallCircle = realm
  .objects(Company)
  .filtered("location geoWithin $0", smallCircle);
console.debug(
  `Companies in small circle: ${companiesInSmallCircle.length}`
);
