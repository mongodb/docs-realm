// Open a thread-safe transaction.
realm.Write(() =>
{
    // Update some properties on the instance.
    // These changes are saved to the realm.
    dog.Name = "Wolfie";
    dog.Age += 1;
});
