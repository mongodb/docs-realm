realm.write(() {
  Todo buyMilk = Todo(ObjectId(), 'Buy milk', loggedInUser.id);
  realm.add<Todo>(buyMilk);
});
