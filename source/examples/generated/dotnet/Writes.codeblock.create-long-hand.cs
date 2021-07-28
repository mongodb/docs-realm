// Open a thread-safe transaction.
var transaction = realm.BeginWrite();

// Perform a write op...
realm.Add(myDog);
try
{
    // Do other work that needs to be included in
    // this transaction
    transaction.Commit();
}
catch (Exception ex)
{
    // Something went wrong; roll back the transaction
    transaction.Dispose();
}
