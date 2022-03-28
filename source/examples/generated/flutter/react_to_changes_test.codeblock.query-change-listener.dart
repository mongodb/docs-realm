// Listen for changes on whole collection
final characters = realm.all<Character>();
final subscription = characters.changes.listen((changes) {
  changes.inserted; // indexes of inserted objects
  changes.modified; // indexes of modified objects
  changes.deleted; // indexes of deleted objects
  changes.newModified; // indexes of modified objects
  // after deletions and insertions are accounted for
  changes.moved; // indexes of moved objects
  changes.results; // the full List of objects
});

// Listen for changes on RealmResults
final hobbits = fellowshipOfTheRing.members.query('species == "Hobbit"');
final hobbitsSubscription = hobbits.changes.listen((changes) {
  // ... all the same data as above
});
