// ProjectTask.java
public class ProjectTask extends RealmObject {
    @Required
    public String name;
    public String assignee;
    public int progressMinutes;
    public boolean isComplete;
    public int priority;
    public String _partition;
}

// Project.java
public class Project extends RealmObject {
    @Required
    public String name;
    public RealmList<ProjectTask> tasks = new RealmList<>();
    public String _partition;
}
