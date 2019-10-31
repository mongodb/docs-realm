// Open a thread-safe transaction.
[realm transactionWithBlock:^() {
    // Update some properties on the instance.
    // These changes are saved to the realm.
    dog.name = @"Wolfie";
    dog.age += 1;
}];
