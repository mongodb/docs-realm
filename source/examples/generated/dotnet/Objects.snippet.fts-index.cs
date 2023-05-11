public partial class Person : IRealmObject
{
    [Indexed(IndexType.FullText)]
    public string Biography { get; set; }
}
