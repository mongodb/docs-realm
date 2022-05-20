class Task() {
    var id: Long = 0 // Kotlin SDK does not yet support ObjectId
    lateinit var name: String
    var isComplete: Boolean = false
    var assignee: String? = null
    var priority: Int = 0
    var progressMinutes: Int = 0
}

class Project() {
    var id: Long = 0 // Kotlin SDK does not yet support ObjectId
    lateinit var name: String
    lateinit var tasks: Array<Task>
    var quota: Int? = null
}
