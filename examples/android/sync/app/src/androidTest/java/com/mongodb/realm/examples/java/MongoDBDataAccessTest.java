package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;

import org.bson.Document;
import org.junit.Test;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.mongo.MongoClient;
import io.realm.mongodb.mongo.MongoCollection;
import io.realm.mongodb.mongo.MongoDatabase;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class MongoDBDataAccessTest extends RealmTest {
    @Test
    public void instantiateAMongoDBCollectionHandle() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    // :code-block-start: instantiate-a-mongodb-collection-handle
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas"); // service for MongoDB Atlas cluster containing custom user data
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("custom-user-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("custom-user-data-collection");
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :hide-start:
                    expectation.fulfill();
                    // :hide-end:
                    // :code-block-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }
}
