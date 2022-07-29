Todo buyMilk = realm.write(() {
  return realm.add<Todo>(Todo(ObjectId(), 'Buy milk', loggedInUser.id));
});
