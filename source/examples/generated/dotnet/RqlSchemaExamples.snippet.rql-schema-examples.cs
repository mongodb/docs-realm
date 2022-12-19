public partial class Task : IRealmObject
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

    [MapTo("projects")]
    [Backlink(nameof(Project.RqlItems))]
    public IQueryable<Project> Projects { get; }
}

public partial class Project : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("name")]
    [Required]
    public string Name { get; set; }

    [MapTo("items")]
    public IList<Item> RqlItems { get; }

    [MapTo("quota")]
    public int Quota { get; set; }
}
