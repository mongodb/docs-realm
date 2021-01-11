class Migration : RealmMigration {
    override fun migrate(realm: DynamicRealm, oldVersion: Long, newVersion: Long) {
        var oldVersion = oldVersion

        // DynamicRealm exposes an editable schema
        val schema = realm.schema


        // Changes from version 1 to 2 (adding lastName) will occur
        // automatically when Realm detects the change
       
        // Migrate Person from version 2 to 3: replace firstName and
        // lastName with fullName

        // lastName doesn't exist in version 1, so only create fullName from firstName
        if (oldVersion < 2L) {
           schema.create("Person")
               .addField("fullName", String::class.java)

           realm.beginTransaction()
           realm.where(Person.class).findAll().forEach {
               it["fullName"] = it["firstName"]
           }
           realm.commitTransaction()

        // for users upgrading from version 2, create fullName from firstName and lastName
        } else if (oldVersion < 3L) {
           schema.create("Person")
               .addField("fullName", String::class.java)

           realm.beginTransaction()
           realm.where(Person.class).findAll().forEach {
               it["fullName"] = it["firstName"] + " " + it["lastName"]
           }
           realm.commitTransaction()
        }

        // Migrate Person from version 3 to 4: replace age with birthday
        if (oldVersion < 4L) {
           schema.create("Person")
               .addField("birthday", Date::class.java)

           realm.beginTransaction()
           realm.where(Person::class.java).findAll().forEach {
               var birthYear = Date() - it.age
               it["birthday"] = Date(birthYear, 1, 1)
           }
           realm.commitTransaction()
        }
    }
}

@RealmModule(classes = { Person::class.java })
class Module

val config = RealmConfiguration.Builder()
    .schemaVersion(4) // Must be bumped when the schema changes
    .migration(Migration()) // Migration to run instead of throwing an exception
    .build()