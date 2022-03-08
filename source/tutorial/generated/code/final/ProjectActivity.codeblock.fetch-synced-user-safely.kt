val syncedUsers : RealmResults<User> = realm.where<User>().sort("id").findAll()
val syncedUser : User? = syncedUsers.getOrNull(0) // since there might be no user objects in the results, default to "null"
