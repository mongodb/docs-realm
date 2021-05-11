realm.write(() => {
  // remove the 'color' and 'doors' field of the Summerhill House.
  summerHillHouse.remove(["windows", "doors"]);
});
