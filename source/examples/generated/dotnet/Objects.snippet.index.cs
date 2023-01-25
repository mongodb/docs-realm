public partial class Person : IRealmObject
{
    [Indexed]
    public string Name { get; set; }
    public IList<Dog> Dogs { get; }
}
