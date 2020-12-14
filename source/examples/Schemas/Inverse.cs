// To-One relationship
public class Ship : RealmObject
{
    public Captain Captain { get; set; }
}

// To-Many relationship
public class Captain : RealmObject
{
    [Backlink(nameof(Ship.Captain))]
    public IQueryable<Ship> Ships { get; }
}