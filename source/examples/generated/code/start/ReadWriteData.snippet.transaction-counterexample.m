RLMRealm *realm = [RLMRealm defaultRealm];

// BAD EXAMPLE -- avoid this!
[realm beginWriteTransaction];
// ... Make changes ...
// If an exception is thrown here or the function otherwise returns early,
// the transaction remains open!
[realm commitWriteTransaction];
