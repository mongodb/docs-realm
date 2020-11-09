// Define the dog class.
public class Dog : RealmObject
{
    [MapTo("name")]
    public string Name { get; set; }

    // etc..
}

// ... elsewhere:

    // Observe object notifications.
    dog.PropertyChanged += (sender, eventArgs) =>
    {
        Debug.WriteLine($"New value set for '{eventArgs.PropertyName}'");
    };
}
