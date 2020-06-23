public class User extends RealmObject {
    @PrimaryKey
    @Required
    public ObjectId _id;
    
    @Required
    public String _partition;
    
    @Required
    public String name;
    
    public RealmList<Task> tasks;
}

public class Task extends RealmObject {
    @PrimaryKey
    @Required
    public ObjectId _id;
    
    @Required
    public String _partition;
    
    @Required
    public String text;

    @LinkingObjects("tasks")
    public final RealmResults<User> assignee;
}
