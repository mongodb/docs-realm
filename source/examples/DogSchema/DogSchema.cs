public class Dog : RealmObject
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string? Breed { get; set; }
    public Person? Owner { get; set; }
}
