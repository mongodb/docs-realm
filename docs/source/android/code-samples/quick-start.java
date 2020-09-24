package com.mongodb.realm.quickstart

import io.realm.OrderedCollectionChangeSet;
import io.realm.OrderedRealmCollectionChangeListener;
import io.realm.RealmResults;
import org.bson.types.ObjectId;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;

import java.util.List;
import com.mongodb.javarealmsnippets.model.Task;
import io.realm.Realm;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;

import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.sync.SyncConfiguration;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Realm.init(this); // context, usually an Activity or Application
        String appID = "<your app ID>"; // replace this with your App ID
        App app = new App(new AppConfiguration.Builder(appID)
                .build());

        Credentials credentials = Credentials.anonymous();

        app.loginAsync(credentials, it -> {
            if (it.isSuccess()) {
                Log.v("QUICKSTART", "Successfully authenticated anonymously.");

                User user = app.currentUser();

                String partitionValue = "myPartition";
                SyncConfiguration config = new SyncConfiguration.Builder(user, partitionValue)
                                                .build();

                Realm realm = Realm.getInstance(config);

                Task task = new Task("New Task", partitionValue);
                realm.executeTransaction( transactionRealm -> {
                    transactionRealm.insert(task);
                });

                // all tasks in the realm
                RealmResults<Task> tasks = realm.where(Task.class).findAll();

                // you can also filter a collection
                List<Task> tasksThatBeginWithN = tasks.where().beginsWith("name", "N").findAll();
                List<Task> openTasks = tasks.where().equalTo("status", Task.TaskStatus.Open.name()).findAll();

                Task otherTask = tasks.first();

                tasks.addChangeListener(new OrderedRealmCollectionChangeListener<RealmResults<Task>>() {
                    @Override
                    public void onChange(RealmResults<Task> collection, OrderedCollectionChangeSet changeSet) {
                        OrderedCollectionChangeSet.Range[] deletions = changeSet.getDeletionRanges();
                        for (OrderedCollectionChangeSet.Range range : deletions) {
                            Log.v("QUICKSTART", "Deleted range: " + range.startIndex + " to " + (range.startIndex + range.length - 1));
                        }
                        OrderedCollectionChangeSet.Range[] insertions = changeSet.getInsertionRanges();
                        for (OrderedCollectionChangeSet.Range range : insertions) {
                            Log.v("QUICKSTART", "Inserted range: " + range.startIndex + " to " + (range.startIndex + range.length - 1));
                        }

                        OrderedCollectionChangeSet.Range[] modifications = changeSet.getChangeRanges();
                        for (OrderedCollectionChangeSet.Range range : modifications) {
                            Log.v("QUICKSTART", "Updated range: " + range.startIndex + " to " + (range.startIndex + range.length - 1));
                        }
                    }
                });

                // all modifications to a realm must happen inside of a write block
                realm.executeTransaction (transactionRealm -> {
                        Task innerOtherTask = transactionRealm.where(Task.class).equalTo("_id", otherTask.get_id()).findFirst();
                        innerOtherTask.setStatus(Task.TaskStatus.Complete);
                });

                Task yetAnotherTask = tasks.get(0);
                ObjectId yetAnotherTaskId = yetAnotherTask.get_id();
                // all modifications to a realm must happen inside of a write block
                realm.executeTransactionAsync(transactionRealm -> {
                        Task innerYetAnotherTask = transactionRealm.where(Task.class).equalTo("_id", yetAnotherTaskId).findFirst();
                        innerYetAnotherTask.deleteFromRealm();
                });

                realm.close();
            } else {
                Log.e("QUICKSTART", it.getError().toString());
            }
        });
    }
}