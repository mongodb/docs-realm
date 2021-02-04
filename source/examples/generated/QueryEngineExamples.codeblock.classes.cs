public class Task : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public string Assignee { get; set; }
    public bool IsComplete { get; set; }
    public int Priority { get; set; }
    public int ProgressMinutes { get; set; }
}

public class Project : RealmObject
{
    public string Name { get; set; }
    public IList<Task> Tasks { get; }
}
