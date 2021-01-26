package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.Plant;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.Before;
import org.junit.Test;

import java.util.Arrays;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.mongo.MongoClient;
import io.realm.mongodb.mongo.MongoCollection;
import io.realm.mongodb.mongo.MongoDatabase;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class MongoDBDataAccessTest extends RealmTest {
    @Before
    public void setUpData() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas"); // service for MongoDB Atlas cluster containing custom user data
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("custom-user-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("custom-user-data-collection");
                    mongoCollection.insertMany(Arrays.asList(
                            new Plant(new ObjectId(),
                                    "venus flytrap",
                                    "full",
                                    "white",
                                    "perennial",
                                    "Store 42"),
                            new Plant(new ObjectId(),
                                    "sweet basil",
                                    "partial",
                                    "green",
                                    "annual",
                                    "Store 42"),
                            new Plant(new ObjectId(),
                                    "thai basil",
                                    "partial",
                                    "green",
                                    "perennial",
                                    "Store 42"),
                            new Plant(new ObjectId(),
                                    "helianthus",
                                    "full",
                                    "yellow",
                                    "annual",
                                    "Store 42"),
                            new Plant(new ObjectId(),
                                    "petunia",
                                    "full",
                                    "purple",
                                    "annual",
                                    "Store 47")));
                    Log.v("EXAMPLE", "Successfully inserted the sample data.");
                    expectation.fulfill();
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

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
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas"); // service for MongoDB Atlas cluster containing custom user data
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("custom-user-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("custom-user-data-collection");
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    expectation.fulfill();
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }
}
