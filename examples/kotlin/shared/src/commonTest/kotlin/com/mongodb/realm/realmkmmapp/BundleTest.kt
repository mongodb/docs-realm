package com.mongodb.realm.realmkmmapp

import io.realm.kotlin.Realm
import io.realm.kotlin.RealmConfiguration
import kotlin.test.Test
import io.realm.kotlin.internal.platform.runBlocking
import io.realm.kotlin.mongodb.App
import io.realm.kotlin.mongodb.Credentials
import io.realm.kotlin.mongodb.subscriptions
import io.realm.kotlin.mongodb.sync.SyncConfiguration
import io.realm.kotlin.ext.query

class BundleTest: RealmTest() {
    @Test
    fun bundleARealm(){
//        val originalConfig = RealmConfiguration.Builder(schema = setOf(Task::class))
//            .name("original-realm")
//            .build()
//        val originalRealm = Realm.open(originalConfig)

        val app = App.create(YOUR_APP_ID)
        runBlocking {
            val user = app.login(Credentials.anonymous())
            val originalConfig = SyncConfiguration.Builder(user, setOf(SyncTest.Toad::class))
                .name("original-realm")
                .initialSubscriptions { realm ->
                    add(
                        realm.query<SyncTest.Toad>(
                            "name == $0",
                            "name value"
                        ),
                        "subscription name"
                    )
                }
                .build()
            val originalRealm = Realm.open(originalConfig)

            val copyConfig = RealmConfiguration.Builder(schema = setOf(Task::class))
                .name("copy-realm")
                .build()

            originalRealm.writeCopyTo(copyConfig)

//            originalRealm.close()

        }






    }
}

/*
const originalPath = path.join(__dirname, "original.realm");
const originalConfig = {
  schema: [Car],
  path: originalPath,
};
const originalRealm = await Realm.open(originalConfig);
const copyPath = path.join(__dirname, "copy.realm");
originalRealm.writeCopyTo(copyPath);
 */