// Dog.java
public class Dog extends RealmObject {
    @Required
    public String name;
}

// MyActivity.java
public class MyActivity extends Activity {
    private static final String TAG = "MyActivity";

    RealmObjectChangeListener<Dog> listener;
    Dog dog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Realm realm = Realm.getDefaultInstance();
        // Create a dog in the realm.
        realm.executeTransaction(r -> {
            dog = realm.createObject(Dog.class);
            dog.name = "Max";
        });

        // Set up the listener.
        listener = (dog, changeSet) -> {
            if (changeSet.isDeleted()) {
                Log.i(TAG, "The dog was deleted");
                return;
            }

            for (String fieldName : changeSet.getChangedFields()) {
                Log.i(TAG, "Field '" + fieldName + "' changed.");
            }
        };

        // Observe object notifications.
        dog.addChangeListener(listener);

        // Update the dog to see the effect.
        realm.executeTransaction(r -> {
            dog.name = "Wolfie"; // -> "Field 'name' was changed."
        });
    }
}