realm.write(() => {
  // remove the 'color' and 'floors' field of the Yakima City Victorian Home
  yakimaCity.home.remove(["color", "floor"]);
});
