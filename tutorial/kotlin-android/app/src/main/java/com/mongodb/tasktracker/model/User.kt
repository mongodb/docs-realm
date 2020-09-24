package com.mongodb.tasktracker.model

import io.realm.RealmList;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey
import io.realm.annotations.Required

open class User(
    @PrimaryKey var _id: String = "",
    var _partition: String = "",
    var memberOf: RealmList<Project> = RealmList(),
    var name: String = ""
): RealmObject() {}
