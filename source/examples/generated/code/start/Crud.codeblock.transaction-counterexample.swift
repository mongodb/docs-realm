let realm = try! Realm()
// BAD EXAMPLE -- avoid this!

realm.beginWrite()
// ... Make changes ...
// If an exception is thrown before the commit,
// this transaction stays open!
try! realm.commitWrite()
