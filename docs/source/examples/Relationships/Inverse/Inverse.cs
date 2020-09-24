public class Person : RealmObject
{
    [PrimaryKey]
    public ObjectId _id { get; set; }
    public String _partition { get; set; }
    public String Name { get; set; }
    public IList<Task> Tasks { get; set; }
}

public class Task : RealmObject
{
    [PrimaryKey]
    public ObjectId _id { get; set; }
    
    public String _partition { get; set; }
    
    public string Text { get; set; }

    [Backlink(nameof(User.Tasks))]
    public IQueryable<User> Assignee { get; }
}
