// Dog.kt
open class Dog(
    var name: String = ""
): RealmObject()

// MyActivity.kt
class MyActivity : Activity() {
    private lateinit var realm: Realm
    private lateinit var listener: RealmObjectChangeListener<Dog>
    private lateinit var dog: Dog

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        realm = Realm.getDefaultInstance()
        // Create a dog in the realm.
        realm.executeTransaction { r ->
            dog = realm.createObject(Dog::class.java)
            dog.name = "Max"
        }

        // Set up the listener.
        listener = RealmObjectChangeListener { dog, changeSet ->
            if (changeSet.isDeleted()) {
                // Dog was deleted
                return@RealmObjectChangeListener
            }

            for (fieldName in changeSet.getChangedFields()) {
                // "Field '$fieldName' changed."
            }
        }

        // Observe object notifications.
        dog.addChangeListener(listener)

        // Update the dog to see the effect.
        realm.executeTransaction { r ->
            dog.name = "Wolfie" // -> "Field 'name' was changed."
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        // Close the Realm instance.
        realm.close()
    }
}
