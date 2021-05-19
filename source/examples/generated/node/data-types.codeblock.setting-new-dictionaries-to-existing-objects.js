let newVictorianHome;
realm.write(() => {
  newVictorianHome = {
    doors: 4,
    floor: 3,
    color: "white",
    address: "Trailwoods Rd.",
  };
  // use the `put()` method to add a dictionary to a pre-existing city in the database
  summerHillHouse.home.put(newVictorianHome);

  // alternatively, use dot notation to add a dictionary to a pre-existing city
  yakimaCity.home = newVictorianHome;
});
