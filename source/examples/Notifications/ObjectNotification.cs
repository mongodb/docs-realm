var dog = new Dog();
dog.Name = "Max";
// Add the dog to the realm.
realm.Write(() => {
    realm.Add(dog);
});

// Observe object notifications.
dog.PropertyChanged += (sender, eventArgs) =>
{
    Debug.WriteLine($"New value set for '{eventArgs.PropertyName}'");
};

// Update the dog to trigger the notification.
realm.Write(() => dog.Name = "Wolfie"); // => "New value set for 'Name'"