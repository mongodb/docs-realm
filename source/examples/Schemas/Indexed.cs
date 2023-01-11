public class Person : RealmObject
{
    [Indexed]
    public string Name { get; set; }
    public IList<Dog> Dogs { get; }
}
