package com.mongodb.realm.realmkmmapp

import io.github.aakira.napier.DebugAntilog
import io.github.aakira.napier.Napier
import io.realm.kotlin.RealmConfiguration
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

    val SYNCED_REALM_SCHEMA = setOf(Frog::class, Sample::class)
    val YOUR_APP_ID: String = "kmm-example-testers-viybt"
    val TMP_PATH = "/tmp"
    val mainThreadSurrogate = newSingleThreadContext("UI thread")
    val defaultRealmConfiguration = RealmConfiguration.Builder(setOf())
        // :remove-start:
        .directory(TMP_PATH)
        .name(getRandom())
        // :remove-end:
        .build()

    // kotlin test framework doesn't support "before class" on jvm, so... before each test
    @BeforeTest
    internal fun setUp() {
        Dispatchers.setMain(mainThreadSurrogate) // set a fake "ui thread" for the jvm
        Napier.base(DebugAntilog()) // initialize napier

    }
}