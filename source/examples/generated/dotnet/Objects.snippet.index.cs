public partial class Person : IRealmObject
{
    [Indexed]
    public string Name { get; set; }

    [Indexed(IndexType.FullText)]
    public string Biography { get; set; }

    public IList<Dog> Dogs { get; }
}
