let sanDiegoCity;
realm.write(() => {
  sanDiegoCity = realm.create("City", {
    name: "san diego",
    home: {
      windows: 5,
      doors: 3,
      floor: 1,
      color: "red",
      address: "Summerhill St.",
    },
  });
});
