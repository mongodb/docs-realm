Realm realm = Realm.getDefaultInstance();

// Open a thread-safe transaction.
realm.executeTransaction(r -> {
    // ... Make changes
    // Realm automatically cancels the transaction if this
    // code block throws an exception. Otherwise, Realm
    // automatically commits the transaction at the end
    // of the code block.
});

// ...

// Always remember to close the realm when 
// you are done with it.
realm.close();
