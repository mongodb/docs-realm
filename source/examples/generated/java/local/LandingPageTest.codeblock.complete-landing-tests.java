
import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.java.Frog;

import org.junit.Assert;
import org.junit.Test;

import java.util.concurrent.atomic.AtomicReference;

import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.RealmObjectChangeListener;
import io.realm.RealmQuery;

public class LandingPageTest extends RealmTest {
    @Test
    public void testQuery() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm realm = Realm.getInstance(config);
            RealmQuery<Frog> frogsQuery = realm.where(Frog.class);

            long numTadpoles =
                    frogsQuery.lessThan("age", 1).count();
            Log.i("EXAMPLE", "Tadpoles: "
                    + numTadpoles);

            long numFrogsNamedJasonFunderburker =
                    frogsQuery.equalTo("name", "Jason Funderburker").count();
            Log.i("EXAMPLE", "Frogs named Jason Funderburker: "
                    + numFrogsNamedJasonFunderburker);

            long numFrogsWithoutOwners =
                    frogsQuery.isNull("owner").count();
            Log.i("EXAMPLE", "Frogs without owners: "
                    + numFrogsWithoutOwners);
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }

    @Test
    public void testUpdate() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .build();

            Realm realm = Realm.getInstance(config);

            realm.executeTransactionAsync(transactionRealm -> { // start a write transaction
                // get a frog from the database to update
                Frog frog =
                        transactionRealm.where(Frog.class)
                                .equalTo("name", "Benjamin Franklin").findFirst();
                // change the frog's name
                frog.setName("George Washington");
                // change the frog's species
                frog.setSpecies("American bullfrog");
            }); // when the transaction completes, the frog's name and species
            // are updated in the database
        });
        expectation.await();
    }

    @Test
    public void testNotifications() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // configure and open a local realm
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();
            Realm realm = Realm.getInstance(config);

            // create an reference to a frog
            AtomicReference<Frog> frog = new AtomicReference<Frog>();

            // insert a new frog into the database and store it in our reference
            realm.executeTransaction(transactionRealm -> {
                Frog result = transactionRealm.createObject(Frog.class);
                result.setName("Doctor Cucumber");
                result.setAge(3);
                result.setSpecies("Tree Frog");
                result.setOwner("Greg");
                frog.set(result);
            });

            // create a listener that logs new changes to the frog
            RealmObjectChangeListener<Frog> listener = (changedFrog, changeSet) -> {
                if (changeSet.isDeleted()) {
                    Log.i("EXAMPLE", "The frog was deleted");
                    return;
                }
                for (String fieldName : changeSet.getChangedFields()) {
                    Log.i("EXAMPLE", "Field '" + fieldName + "' changed.");
                }
            };

            // attach the listener we just created to the frog
            frog.get().addChangeListener(listener);

            // update the frog
            realm.executeTransaction(transactionRealm -> {
                frog.get().setName("Ronald");
            });
            // when the transaction completes, the listener logs that "Field 'name' changed."
        });
        expectation.await();
    }


    @Test
    public void testLiveObjects() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            // configure and open a local realm
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();
            Realm realmA = Realm.getInstance(config);
            Realm realmB = Realm.getInstance(config);


            // get a reference to a single frog object
            // stored in the database from each realm instance
            Frog frogA = realmA.where(Frog.class)
                    .equalTo("name", "Mr. President").findFirst();
            Frog frogB = realmB.where(Frog.class)
                    .equalTo("name", "Mr. President").findFirst();

            // update frog A's name
            realmA.executeTransaction(transactionRealm -> {
                frogA.setName("Skipper");
            });
            // frog B instance automatically updates with the new name
            Assert.assertEquals(frogA.getName(), frogB.getName());

            // update frog B's age
            realmB.executeTransaction(transactionRealm -> {
                frogB.setAge(10);
            });
            // frog A instance automatically updates with the new age
            Assert.assertEquals(frogB.getAge(), frogA.getAge());
            expectation.fulfill();
        });
        expectation.await();
    }
}
