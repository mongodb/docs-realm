package com.mongodb.tasktracker.model

import org.bson.Document

class Member (document: Document) {
    val id : String = document["_id"] as String
    val name : String = document["name"] as String
}
