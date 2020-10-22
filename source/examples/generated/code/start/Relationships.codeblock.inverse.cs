public class User : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("_partition")]
    public string Partition { get; set; }

    public string Name { get; set; }

    public IList<Task> Tasks { get; }
}

public class Task : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("_partition")]
    public string Partition { get; set; }

    public string Text { get; set; }

    [Backlink(nameof(User.Tasks))]
    public IQueryable<User> Assignee { get; }
}