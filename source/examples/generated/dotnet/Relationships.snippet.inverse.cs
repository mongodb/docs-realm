public class User : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    public string Name { get; set; }

    [Backlink(nameof(Task.Assignee))]
    public IQueryable<Task> Tasks { get; }
}

public class Task : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    public string Text { get; set; }

    public User Assignee { get; set; }
}
