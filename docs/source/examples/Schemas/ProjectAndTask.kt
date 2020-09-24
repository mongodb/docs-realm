open class ProjectTask(
    @Required
    var name: String = "",
    var assignee: String? = null,
    var progressMinutes: Int = 0,
    var isComplete: Boolean = false,
    var priority: Int = 0,
    var _partition: String = ""
): RealmObject()

open class Project(
    @Required
    var name: String = "",
    var tasks: RealmList<ProjectTask> = RealmList(),
    var _partition: String = ""
): RealmObject()
