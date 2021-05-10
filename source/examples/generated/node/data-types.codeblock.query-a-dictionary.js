// find all houses in san diego
const housesInSanDiego = realm
  .objects("City")
  .filtered("name = 'san diego'");
// filtered for a house with the address Summerhill St.
const summerHillHouse = housesInSanDiego.filtered(
  `home['address'] = "Summerhill St."`
)[0];

// Find all houses that has windows as a key.
const housesWithWindows = housesInSanDiego.filtered(
  `home.@keys = "windows" `
);
// find all houses that has any field with a value of 'red'
const redHouses = housesInSanDiego.filtered(`home.@values = "red" `);
