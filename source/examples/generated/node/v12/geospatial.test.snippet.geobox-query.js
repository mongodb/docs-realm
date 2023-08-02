const companiesInLargeBox = realm
  .objects(Company)
  .filtered("location geoWithin $0", largeBox);
console.log("Companies in large circle: ${companiesInLargeBox.length}");

const companiesInSmallBox = realm
  .objects(Company)
  .filtered("location geoWithin $0", smallBox);
console.log("Companies in small circle: ${companiesInSmallBox.length}");
