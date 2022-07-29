RealmResults<Todo> allTodos = realm.query<Todo>('"summary = 'Buy milk'"');
 realm.write(() {
   realm.deleteMany(allTodos);
 });
