final fellowshipSubscription =
    fellowshipOfTheRing.members.changes.listen((changes) {
  changes.inserted; // indexes of inserted Realm objects
  changes.modified; // indexes of modified Realm objects
  changes.deleted; // indexes of deleted Realm objects
  changes.newModified; // indexes of modified Realm objects
  // after deletions and insertions are accounted for
  changes.moved; // indexes of moved Realm objects
  changes.list; // the full RealmList of Realm objects
});
