// Open the default realm with the relevant schema.
const realm = await Realm.open({ schema: [DogSchema] });

// Open a transaction.
realm.write(() => {
  // ... Make changes ...
  // Realm automatically cancels the transaction if this
  // code block throws an exception. Otherwise, Realm
  // automatically commits the transaction at the end
  // of the code block.
});
