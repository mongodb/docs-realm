// Open a thread-safe transaction.
var transaction = realm.BeginWrite();
// Add the instance to the realm.
realm.Add(myDog);

try
{
    // Do other work that needs to be included in
    // this transaction
}
catch (Exception ex)
{
    // Something went wrong; roll back the transaction
    transaction.Dispose();
}
transaction.Commit();
