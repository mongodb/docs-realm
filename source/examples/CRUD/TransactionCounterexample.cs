// BAD EXAMPLE -- avoid this!

// The transaction in a using block is automatically
// disposed at the end of the block, which rolls back
// any uncommitted changes.
using (var transaction = realm.BeginWrite())
{
    // ... Make changes ...

    // Manually commit the transaction upon success.
    // If you forget to do this, your changes will be
    // lost at the end of your block.
    transaction.Commit();
}
