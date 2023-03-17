package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.types.RealmList
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.ObjectId

class RQLTest: RealmTest() {
    // :snippet-start: rql-schema-example
    class Item(): RealmObject {
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
        lateinit var items: RealmList<Item>
        var quota: Int? = null
    }
    // :snippet-end:
}