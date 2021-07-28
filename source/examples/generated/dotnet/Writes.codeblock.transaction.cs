realm.Write(() =>
{
    // Create someone to take care of ssome dogs.
    var ali = new Person { Id = 44, Name = "Ali" };
    realm.Add(ali);

    // Find dogs younger than 2.
    var puppies = realm.All<Dog>().Where(dog => dog.Age < 2);

    // Loop through one by one to update.
    foreach (var puppy in puppies)
    {
        // Give all the puppies to Ali.
        puppy.Owner = ali;
    }
});
