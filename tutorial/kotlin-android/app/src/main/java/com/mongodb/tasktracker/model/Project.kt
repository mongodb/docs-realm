package com.mongodb.tasktracker.model

import io.realm.RealmObject;
import io.realm.annotations.RealmClass

@RealmClass(embedded = true)
open class Project(
    var name: String? = null,
    var partition: String? = null
): RealmObject()
