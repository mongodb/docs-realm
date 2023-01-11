RealmResults<Todo> incompleteTodos = realm.query<Todo>("isComplete == false");
