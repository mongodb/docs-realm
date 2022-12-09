class Person extends Realm.Object {
    static schema = {
        name: "Person",
        properties: {
            name: "string",
            age: "int?",
        },
    }
}
class Task extends Realm.Object {
    static schema = {
        name: "Task",
        properties: {
            _id: "int",
            name: "string",
            priority: "int?",
            progressMinutes: "int?",
            assignee: "Person?",
        },
        primaryKey: "_id",
    }
}
