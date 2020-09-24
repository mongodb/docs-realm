class User: RealmObject {
    @PrimaryKey var _id: ObjectId = ObjectId()
    var _partition: String = ""
    var name: String = ""
    var tasks = RealmList<Task>()
}

class Task: RealmObject {
    @PrimaryKey var _id: ObjectId = ObjectId()
    var _partition: String = ""
    var text: String = ""
    @LinkingObjects("tasks") var RealmResults<User> assignee;
}
