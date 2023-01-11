// BAD EXAMPLE -- avoid this!

[realm beginWriteTransaction];
// ... Make changes ...
// If an exception is thrown here, the transaction remains open!
[realm commitWriteTransaction];
