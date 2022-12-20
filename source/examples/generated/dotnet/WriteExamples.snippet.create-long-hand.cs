// Open a thread-safe transaction.
var transaction = realm.BeginWrite();
try
{
    // Perform a write op...
    realm.Add(myDog);
    // Do other work that needs to be included in
    // this transaction
    transaction.Commit();
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
    // Something went wrong; roll back the transaction
    transaction.Dispose();
}
