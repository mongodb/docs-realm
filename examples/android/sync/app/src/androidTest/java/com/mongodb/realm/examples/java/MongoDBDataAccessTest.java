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
import java.util.List;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.RealmResultTask;
import io.realm.mongodb.User;
import io.realm.mongodb.mongo.MongoClient;
import io.realm.mongodb.mongo.MongoCollection;
import io.realm.mongodb.mongo.MongoDatabase;
import io.realm.mongodb.mongo.iterable.MongoCursor;

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
                    // :code-block-start: example-data
                    User user = app.currentUser();
                    MongoClient mongoClient =
                            user.getMongoClient("mongodb-atlas"); // service for MongoDB Atlas cluster containing custom user data
                    MongoDatabase mongoDatabase =
                            mongoClient.getDatabase("plant-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("plant-data-collection");
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
                            mongoClient.getDatabase("plant-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("plant-data-collection");
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

    @Test
    public void insertASingleDocument() {
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
                            mongoClient.getDatabase("plant-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("plant-data-collection");
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :code-block-start: insert-a-single-document
                    Plant plant = new Plant(new ObjectId(), "lily of the valley","full","white","perennial", "Store 47");
                    mongoCollection.insertOne(plant).getAsync(task -> {
                        if (it.isSuccess()) {
                            Log.v("EXAMPLE", "successfully inserted a document with id: " + task.get().getInsertedId());
                            // :hide-start:
                            expectation.fulfill();
                            // :hide-end:
                        } else {
                            Log.e("EXAMPLE", "failed to insert documents with: " + task.getError().getErrorMessage());
                        }
                    });
                    // :code-block-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void insertMultipleDocuments() {
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
                            mongoClient.getDatabase("plant-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("plant-data-collection");
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :code-block-start: insert-multiple-documents
                    List<Plant> plants  = Arrays.asList(
                            new Plant(new ObjectId(),
                                    "rhubarb",
                                    "full",
                                    "red",
                                    "perennial",
                                    "Store 47"),
                            new Plant(new ObjectId(),
                                    "wisteria lilac",
                                    "partial",
                                    "purple",
                                    "perennial",
                                    "Store 42"),
                            new Plant(new ObjectId(),
                                    "daffodil",
                                    "full",
                                    "yellow",
                                    "perennial",
                                    "Store 42"));
                    mongoCollection.insertMany(plants).getAsync(task -> {
                        if (task.isSuccess()) {
                            int insertedCount = task.get().getInsertedIds().size();
                            Log.v("EXAMPLE", "successfully inserted " + insertedCount + " documents into the collection.");
                            // :hide-start:
                            expectation.fulfill();
                            // :hide-end:
                        } else {
                            Log.e("EXAMPLE", "failed to insert documents with: ", task.getError());
                        }
                    });
                    // :code-block-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void findASingleDocument() {
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
                            mongoClient.getDatabase("plant-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("plant-data-collection");
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :code-block-start: find-a-single-document
                    Document queryFilter  = new Document("type", "perennial");
                    mongoCollection.findOne(queryFilter).getAsync(task -> {
                        if (task.isSuccess()) {
                            Document result = task.get();
                            Log.v("EXAMPLE", "successfully found a document: " + result);
                            // :hide-start:
                            expectation.fulfill();
                            // :hide-end:
                        } else {
                            Log.e("EXAMPLE", "failed to find document with: ", task.getError());
                        }
                    });
                    // :code-block-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void findMultipleDocuments() {
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
                            mongoClient.getDatabase("plant-data-database");
                    MongoCollection<Document> mongoCollection =
                            mongoDatabase.getCollection("plant-data-collection");
                    Log.v("EXAMPLE", "Successfully instantiated the MongoDB collection handle");
                    // :code-block-start: find-multiple-documents
                    Document queryFilter  = new Document("_partition", "Store 42");
                    RealmResultTask<MongoCursor<Document>> findTask = mongoCollection.find(queryFilter).iterator();
                    findTask.getAsync(task -> {
                        if (task.isSuccess()) {
                            MongoCursor<Document> results = task.get();
                            Log.v("EXAMPLE", "successfully found all plants for Store 42:");
                            while (results.hasNext()) {
                                Log.v("EXAMPLE", results.next().toString());
                            }
                            // :hide-start:
                            expectation.fulfill();
                            // :hide-end:
                        } else {
                            Log.e("EXAMPLE", "failed to find documents with: ", task.getError());
                        }
                    });
                    // :code-block-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }
}
