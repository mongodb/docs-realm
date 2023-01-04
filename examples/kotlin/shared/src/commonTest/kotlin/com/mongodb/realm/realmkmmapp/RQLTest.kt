package com.mongodb.realm.realmkmmapp

import org.mongodb.kbson.ObjectId
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey

class RQLTest: RealmTest() {
    // :snippet-start: rql-schema-example
    class Task(): RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId()
        lateinit var name: String
        var isComplete: Boolean = false
        var assignee: String? = null
        var priority: Int = 0
        var progressMinutes: Int = 0
    }

    class Project(): RealmObject {
        @PrimaryKey
        var _id: ObjectId = ObjectId()
        lateinit var name: String
        lateinit var tasks: Array<Task>
        var quota: Int? = null
    }
    // :snippet-end:
}