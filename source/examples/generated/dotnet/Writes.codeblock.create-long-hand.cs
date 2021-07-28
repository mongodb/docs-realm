// Open a thread-safe transaction.
var transaction = realm.BeginWrite();
// Add the instance to the realm.
realm.Add(myDog);
// Do other work that needs to be including in
// this transaction
transaction.Commit();
