// Open a thread-safe transaction.
realm.Write(() =>
{
    // Instantiate a class, as normal.
    var dog = new Dog { Name = "Max", Age = 5 };

    // Add the instance to the realm.
    realm.Add(dog);
});
