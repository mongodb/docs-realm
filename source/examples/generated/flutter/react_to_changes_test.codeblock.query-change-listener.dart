// Listen for changes on whole collection
final characters = realm.all<Character>();
final subscription = characters.changes.listen((changes) {
  changes.inserted; // indexes of inserted properties
  changes.modified; // indexes of modified properties
  changes.deleted; // indexes of deleted properties
  changes.newModified; // indexes of modified properties
  // after deletions and insertions are accounted for.
  changes.moved; // indexes of moved properties
  changes.results; // the full List of properties
});

// Listen for changes on RealmResults
final hobbits = fellowshipOfTheRing.members.query('species == "Hobbit"');
final hobbitsSubscription = hobbits.changes.listen((changes) {
  // ... all the same data as above
});
