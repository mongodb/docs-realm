// Listen for changes on whole collection
final todos = realm.all<Todo>();
final todosSubscription = todos.changes.listen((changes) {
  changes.inserted; // indexes of inserted objects
  changes.modified; // indexes of modified objects
  changes.deleted; // indexes of deleted objects
  changes.newModified; // indexes of modified objects
  // after deletions and insertions are accounted for
  changes.moved; // indexes of moved objects
  changes.results; // the full List of objects
  for (var todo in changes.results) {
    print("'${todo.summary}' updated");
  }
});
// Listen for changes on RealmResults
final completedTodos = todos.query('isComplete == true');
final completedTodosSubscription = completedTodos.changes.listen((changes) {
  // ... all the same data as above
});
