const companiesInCircle1 = realm
  .objects(Company)
  .filtered("location geoWithin $0", circle1);
console.debug(`Companies in circle1: ${companiesInCircle1.length}`);

const companiesInCircle2 = realm
  .objects(Company)
  .filtered("location geoWithin $0", circle2);
console.debug(`Companies in circle2: ${companiesInCircle2.length}`);
