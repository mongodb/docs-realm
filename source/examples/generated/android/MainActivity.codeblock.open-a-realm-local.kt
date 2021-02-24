val partitionValue: String = "My Project"
val config = RealmConfiguration.Builder().build()

val backgroundThreadRealm : Realm = Realm.getInstance(config)
