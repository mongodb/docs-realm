public class Task : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("name")]
    [Required]
    public string Name { get; set; }

    [MapTo("isComplete")]
    public bool IsComplete { get; set; } = false;

    [MapTo("assignee")]
    public string Assignee { get; set; }

    [MapTo("priority")]
    public int Priority { get; set; } = 0;

    [MapTo("progressMinutes")]
    public int ProgressMinutes { get; set; } = 0;
}

public class Project : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("name")]
    [Required]
    public string Name { get; set; }

    [MapTo("tasks")]
    public IList<Task> Tasks { get; }

    [MapTo("quota")]
    public int Quota { get; set; }
}
