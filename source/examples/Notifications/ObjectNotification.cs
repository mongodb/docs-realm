// Define the dog class.
public class Dog : RealmObject
{
    [MapTo("name")]
    public string Name { get; set; }
}

// ... elsewhere, as a method of another class
async void example()
{
    // Open the default realm.
    var realm = await Realm.GetInstanceAsync();
    var dog = new Dog();
    dog.Name = "Max";
    // Add the dog to the realm.
    realm.Write(() =>
    {
        realm.Add(dog);
    });

    // Observe object notifications.
    dog.PropertyChanged += (sender, eventArgs) =>
    {
        Debug.WriteLine($"New value set for '{eventArgs.PropertyName}'");
    };

    // Update the dog to trigger the notification.
    realm.Write(() => dog.Name = "Wolfie"); // => "New value set for 'name'"
}
