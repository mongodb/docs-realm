// Open a thread-safe transaction.
realm.Write(() =>
{
    // Get a dog to update.
    var dog = realm.All<Dog>().First();

    // Update some properties on the instance.
    // These changes are saved to the realm.
    dog.Name = "Wolfie";
    dog.Age += 1;
});
