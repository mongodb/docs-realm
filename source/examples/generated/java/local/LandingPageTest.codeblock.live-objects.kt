// configure and open a local realm
val config = RealmConfiguration.Builder()
    .allowQueriesOnUiThread(true)
    .allowWritesOnUiThread(true)
    .build()
val realmA = Realm.getInstance(config)
val realmB = Realm.getInstance(config)


// get a reference to a single frog object
// stored in the database from each realm instance
val frogA = realmA.where(Frog::class.java)
    .equalTo("name", "Mr. President")
    .findFirst()
val frogB = realmB.where(Frog::class.java)
    .equalTo("name", "Mr. President")
    .findFirst()

// update frog A's name
realmA.executeTransaction { frogA?.name = "Skipper" }
// frog B instance automatically updates with the new name
Assert.assertEquals(frogA?.name, frogB?.name)

// update frog B's age
realmB.executeTransaction { frogB?.age = 10 }
// frog A instance automatically updates with the new age
Assert.assertEquals(frogB?.age, frogA?.age)
