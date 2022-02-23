package com.mongodb.realm.realmkmmapp

import io.github.aakira.napier.DebugAntilog
import io.github.aakira.napier.Napier
import io.realm.RealmConfiguration
import kotlin.random.Random
import kotlin.test.BeforeTest
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.newSingleThreadContext
import kotlinx.coroutines.test.setMain

/*
 * RealmTest -- base class that provides utilities/setup for all other test classes
 */
open class RealmTest {
    fun getRandom(): String {
        return Random.nextLong(100000000).toString()
    }

    fun randomTmpRealmPath() : String {
        return "/tmp/${getRandom()}"
    }

    val YOUR_APP_ID: String = "kmm-example-testers-viybt"
    val mainThreadSurrogate = newSingleThreadContext("UI thread")
    val defaultRealmConfiguration = RealmConfiguration.Builder()
        .path("/tmp/${getRandom()}")
        .build()

    // kotlin test framework doesn't support "before class" on jvm, so... before each test
    @BeforeTest
    internal fun setUp() {
        Dispatchers.setMain(mainThreadSurrogate) // set a fake "ui thread" for the jvm
        Napier.base(DebugAntilog()) // initialize napier

    }
}