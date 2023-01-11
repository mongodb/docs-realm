// BAD EXAMPLE -- avoid this!

realm.beginTransaction();
// ... Make changes ...
// If an exception is thrown here, the transaction remains open!
realm.commitTransaction();
