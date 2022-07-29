Todo buyMilk = realm.query<Todo>("summary = 'Buy milk'")[0];
realm.write(() {
  buyMilk.isComplete = true;
});
