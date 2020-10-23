public class User : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    public string Name { get; set; }

    public IList<Task> Tasks { get; }
}

public class Task : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    public string Text { get; set; }

    [Backlink(nameof(User.Tasks))]
    public IQueryable<User> Assignee { get; }
}