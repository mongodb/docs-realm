realm.Write(() =>
{
    var drew = new Person { Id = 1234, Name = "Drew" };
    // Add a new person to the realm. Since nobody with ID 1234
    // has been added yet, this adds the instance to the realm.
    realm.Add(drew, update: true);

    var andy = new Person { Id = 1234, Name = "Andy" };
    // Judging by the ID, it's the same person, just with a different name.
    // When `update` is true, you overwrite the original entry (i.e. Drew -> Andy).
    realm.Add(andy, update: true);
});
