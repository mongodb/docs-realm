var dog = realm.All<Dog>().First();
realm.Write(() =>
{
    dog.Name = "Wolfie";
    dog.Age += 1;
});
