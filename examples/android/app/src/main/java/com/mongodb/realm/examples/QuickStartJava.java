package com.mongodb.realm.examples;

import io.realm.OrderedCollectionChangeSet;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.Required;
import org.bson.types.ObjectId;

import android.os.Bundle;
import android.os.Looper;
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;
import io.realm.OrderedRealmCollectionChangeListener;

import io.realm.Realm;
import io.realm.RealmResults;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;

import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.sync.SyncConfiguration;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.FutureTask;


public class QuickStartJava extends AppCompatActivity {
    Realm uiThreadRealm;
    App app;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Realm.init(this); // context, usually an Activity or Application
        String appID = "example-testers-kvjdy"; // replace this with your App ID
        app = new App(new AppConfiguration.Builder(appID)
            .build());

        Credentials credentials = Credentials.anonymous();

        app.loginAsync(credentials, result -> {
            if (result.isSuccess()) {
                Log.v("QUICKSTART", "Successfully authenticated anonymously.");

                String partitionValue = "My Project";
                SyncConfiguration config = new SyncConfiguration.Builder(
                        app.currentUser(),
                        partitionValue)
                    .build();

                uiThreadRealm = Realm.getInstance(config);

                // all tasks in the realm
                RealmResults<Task> tasks = uiThreadRealm.where(Task.class).findAllAsync();

                tasks.addChangeListener(new OrderedRealmCollectionChangeListener<RealmResults<Task>>() {
                    @Override
                    public void onChange(RealmResults<Task> collection, OrderedCollectionChangeSet changeSet) {
                        // process deletions in reverse order if maintaining parallel data structures so indices don't change as you iterate
                        OrderedCollectionChangeSet.Range[] deletions = changeSet.getDeletionRanges();
                        for (OrderedCollectionChangeSet.Range range : deletions) {
                            Log.v("QUICKSTART", "Deleted range: " + range.startIndex + " to " + (range.startIndex + range.length - 1));
                        }

                        OrderedCollectionChangeSet.Range[] insertions = changeSet.getInsertionRanges();
                        for (OrderedCollectionChangeSet.Range range : insertions) {
                            Log.v("QUICKSTART", "Inserted range: " + range.startIndex + " to " + (range.startIndex + range.length - 1));                            }

                        OrderedCollectionChangeSet.Range[] modifications = changeSet.getChangeRanges();
                        for (OrderedCollectionChangeSet.Range range : modifications) {
                            Log.v("QUICKSTART", "Updated range: " + range.startIndex + " to " + (range.startIndex + range.length - 1));                            }
                    }
                });

                FutureTask<String> task = new FutureTask(new BackgroundQuickStart(app.currentUser()), "test");
                ExecutorService executorService = Executors.newFixedThreadPool(2);
                executorService.execute(task);

                try {
                    Log.v("QUICKSTART", "Result: " + task.get());
                } catch (ExecutionException e) {
                    e.printStackTrace();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            } else {
                Log.e("QUICKSTART", "Failed to log in. Error: " + result.getError());
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        uiThreadRealm.close();
        app.currentUser().logOutAsync(result -> {
            if (result.isSuccess()) {
                Log.v("QUICKSTART", "Successfully logged out.");
            } else {
                Log.e("QUICKSTART", "Failed to log out, error: " + result.getError());
            }
        });
    }

    public class BackgroundQuickStart implements Runnable {
        User user;

        public BackgroundQuickStart(User user) {
            this.user = user;
        }

        @Override
        public void run() {
            String partitionValue = "My Project";
            SyncConfiguration config = new SyncConfiguration.Builder(
                    user,
                    partitionValue)
                .build();

            Realm backgroundThreadRealm = Realm.getInstance(config);

            Task task = new Task("New Task", partitionValue);
            backgroundThreadRealm.executeTransaction (transactionRealm -> {
                transactionRealm.insert(task);
            });

            // all tasks in the realm
            RealmResults<Task> tasks = backgroundThreadRealm.where(Task.class).findAll();

            // you can also filter a collection
            RealmResults<Task> tasksThatBeginWithN = tasks.where().beginsWith("name", "N").findAll();
            RealmResults<Task> openTasks = tasks.where().equalTo("status", TaskStatus.Open.name()).findAll();

            Task otherTask = tasks.get(0);


            // all modifications to a realm must happen inside of a write block
            backgroundThreadRealm.executeTransaction( transactionRealm -> {
                Task innerOtherTask = transactionRealm.where(Task.class).equalTo("_id", otherTask.get_id()).findFirst();
                innerOtherTask.setStatus(TaskStatus.Complete.name());
            });

            Task yetAnotherTask = tasks.get(0);
            ObjectId yetAnotherTaskId = yetAnotherTask.get_id();
            // all modifications to a realm must happen inside of a write block
            backgroundThreadRealm.executeTransaction( transactionRealm -> {
                Task innerYetAnotherTask = transactionRealm.where(Task.class).equalTo("_id", yetAnotherTaskId).findFirst();
                innerYetAnotherTask.deleteFromRealm();
            });

            backgroundThreadRealm.close();
        }
    }
}