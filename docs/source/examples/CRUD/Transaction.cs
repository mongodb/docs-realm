// Open the default realm.
var realm = Realm.GetInstance();

// Open a thread-safe transaction.
realm.Write(() =>
{
    // Make any writes within this code block.
    // Realm automatically cancels the transaction
    // if this code throws an exception. Otherwise,
    // Realm automatically commits the transaction
    // after the end of this code block.
});
