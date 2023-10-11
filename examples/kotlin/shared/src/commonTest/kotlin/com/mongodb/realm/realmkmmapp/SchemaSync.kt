package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.ext.realmListOf
import io.realm.kotlin.types.RealmInstant
import io.realm.kotlin.types.RealmList
import io.realm.kotlin.types.RealmObject
import io.realm.kotlin.types.annotations.PrimaryKey
import org.mongodb.kbson.ObjectId

// :replace-start: {
//   "terms": {
//      "ExampleSyncObject_": "",
//      "SyncTask": "Task"
//   }
// }

/*
******** Object Models to use in Sync examples and tests *********
*/

class Toad : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
}

// :snippet-start: flexible-sync-models
class SyncTask : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var taskName: String = ""
    var assignee: String? = null
    var completed: Boolean = false
    var progressMinutes: Int = 0
    var dueDate: RealmInstant? = null
}

class Team : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var teamName: String = ""
    var tasks: RealmList<SyncTask>? = realmListOf()
    var members: RealmList<String> = realmListOf()
}
// :snippet-end:


/*
** Used on Add Sync to App page **
 */

// :snippet-start: sync-to-do-model
class ExampleSyncObject_List : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var ownerId: String = ""
    var items: RealmList<ExampleSyncObject_Item> = realmListOf()
}

class ExampleSyncObject_Item : RealmObject {
    @PrimaryKey
    var _id: ObjectId = ObjectId()
    var name: String = ""
    var complete: Boolean = false
}
// :snippet-end:

// :replace-end: