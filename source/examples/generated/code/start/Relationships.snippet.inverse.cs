public class User : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

    public string Name { get; set; }

    [Backlink(nameof(Task.Assignee))]
    public IQueryable<Task> Tasks { get; }
}
public class Task : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public string Id { get; set; } = ObjectId.GenerateNewId().ToString();

    public string Text { get; set; }

    public User Assignee { get; set; }
}