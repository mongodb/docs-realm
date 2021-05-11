realm.write(() => {
  // remove the 'color' and 'floors' field of the Summerhill House.
  summerHillHouse.remove(["windows", "doors"]);
});
