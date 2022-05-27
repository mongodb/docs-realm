public class Person : RealmObject
{
    [Required]
    public string Name { get; set; }
    public IList<Dog> Dogs { get; }
}
