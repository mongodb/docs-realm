public class User : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    public string Name { get; set; }

    [Backlink(nameof(Item.Assignee))]
    public IQueryable<Item> Items { get; }
}

public class Item : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    public string Text { get; set; }

    public User Assignee { get; set; }
}
