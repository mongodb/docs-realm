package com.mongodb.realm.examples.java;

import io.realm.OrderedCollectionChangeSet;

import org.bson.types.ObjectId;

import android.os.Bundle;

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

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.FutureTask;

import com.mongodb.realm.examples.model.Task;
import com.mongodb.realm.examples.model.TaskStatus;


public class MainActivity extends AppCompatActivity {
    Realm uiThreadRealm;
    App app;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // :code-block-start: initialize-realm
        Realm.init(this); // context, usually an Activity or Application
        // :code-block-end:

        // :code-block-start: initialize-the-app
        // :hide-start:
        String appID = "example-testers-kvjdy"; // replace this with your App ID
        // :replace-with:
        //String appID = YOUR_APP_ID;
        // :hide-end:
        app = new App(new AppConfiguration.Builder(appID)
            .build());
        // :code-block-end:

        // :code-block-start: authenticate-a-user
        Credentials credentials = Credentials.anonymous();

        app.loginAsync(credentials, result -> {
            if (result.isSuccess()) {
                Log.v("QUICKSTART", "Successfully authenticated anonymously.");
                User user = app.currentUser();

                String partitionValue = "My Project";
                SyncConfiguration config = new SyncConfiguration.Builder(
                        user,
                        partitionValue)
                    .build();

                uiThreadRealm = Realm.getInstance(config);

                addChangeListenerToRealm(uiThreadRealm);

                FutureTask<String> task = new FutureTask(new BackgroundQuickStart(app.currentUser()), "test");
                ExecutorService executorService = Executors.newFixedThreadPool(2);
                executorService.execute(task);

                // :hide-start:
                while(!task.isDone()) {
                    // wait for task completion
                }

                try {
                    Log.v("QUICKSTART", "Result: " + task.get());
                } catch (ExecutionException e) {
                    e.printStackTrace();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                finish(); // destroy activity when background task completes
                // :hide-end:
            } else {
                Log.e("QUICKSTART", "Failed to log in. Error: " + result.getError());
            }
        });
        // :code-block-end:
    }

    private void addChangeListenerToRealm(Realm realm) {
        // :code-block-start: watch-for-changes
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
        // :code-block-end:
    }


        @Override
    protected void onDestroy() {
        super.onDestroy();
        // the ui thread realm uses asynchronous transactions, so we can only safely close the realm
        // when the activity ends and we can safely assume that those transactions have completed
        uiThreadRealm.close();
        // :code-block-start: log-out
        app.currentUser().logOutAsync(result -> {
            if (result.isSuccess()) {
                Log.v("QUICKSTART", "Successfully logged out.");
            } else {
                Log.e("QUICKSTART", "Failed to log out, error: " + result.getError());
            }
        });
        // :code-block-end:
    }

    public class BackgroundQuickStart implements Runnable {
        User user;

        public BackgroundQuickStart(User user) {
            this.user = user;
        }

        @Override
        public void run() {
            // :code-block-start: open-a-realm
            String partitionValue = "My Project";
            SyncConfiguration config = new SyncConfiguration.Builder(
                    user,
                    partitionValue)
                .build();

            Realm backgroundThreadRealm = Realm.getInstance(config);
            // :code-block-end:

            // :code-block-start: create-object
            Task task = new Task("New Task");
            backgroundThreadRealm.executeTransaction (transactionRealm -> {
                transactionRealm.insert(task);
            });
            // :code-block-end:

            // :code-block-start: read-object
            // all tasks in the realm
            RealmResults<Task> tasks = backgroundThreadRealm.where(Task.class).findAll();
            // :code-block-end:

            // :code-block-start: filter-collection
            // you can also filter a collection
            RealmResults<Task> tasksThatBeginWithN = tasks.where().beginsWith("name", "N").findAll();
            RealmResults<Task> openTasks = tasks.where().equalTo("status", TaskStatus.Open.name()).findAll();
            // :code-block-end:

            // :code-block-start: update-object
            Task otherTask = tasks.get(0);

            // all modifications to a realm must happen inside of a write block
            backgroundThreadRealm.executeTransaction( transactionRealm -> {
                Task innerOtherTask = transactionRealm.where(Task.class).equalTo("_id", otherTask.get_id()).findFirst();
                innerOtherTask.setStatus(TaskStatus.Complete);
            });
            // :code-block-end:

            // :code-block-start: delete-object
            Task yetAnotherTask = tasks.get(0);
            ObjectId yetAnotherTaskId = yetAnotherTask.get_id();
            // all modifications to a realm must happen inside of a write block
            backgroundThreadRealm.executeTransaction( transactionRealm -> {
                Task innerYetAnotherTask = transactionRealm.where(Task.class).equalTo("_id", yetAnotherTaskId).findFirst();
                innerYetAnotherTask.deleteFromRealm();
            });
            // :code-block-end:

            // because this background thread uses synchronous realm transactions, at this point all
            // transactions have completed and we can safely close the realm
            backgroundThreadRealm.close();
        }
    }
}
