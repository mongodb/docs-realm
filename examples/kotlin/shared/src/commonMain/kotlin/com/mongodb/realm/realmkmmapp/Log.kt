package com.mongodb.realm.realmkmmapp

import io.github.aakira.napier.Napier

/*
 * Log -- singleton class for interacting with Napier without
 * constantly naming Napier
 */
object Log {
    fun wtf(log: String) {
        Napier.wtf(log)
    }
    fun e(log: String) {
        Napier.e(log)
    }
    fun w(log: String) {
        Napier.w(log)
    }
    fun d(log: String) {
        Napier.d(log)
    }
    fun i(log: String) {
        Napier.i(log)
    }
    fun v(log: String) {
        Napier.v(log)
    }
}