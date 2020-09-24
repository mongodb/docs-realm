public class Person : RealmObject
{
    [PrimaryKey]
    public int Id { get; set; }

    public string Name { get; set; }

    [Backlink(nameof(Dog.Owner))]
    public IQueryable<Dog> Dogs { get; }
}
