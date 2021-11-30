package com.mongodb.realm.realmkmmapp

class Greeting {
    fun greeting(): String {
        return "Hello, ${Platform().platform}!"
    }
}