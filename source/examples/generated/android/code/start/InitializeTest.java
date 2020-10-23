package com.mongodb.realm.examples.java;

import com.mongodb.realm.examples.RealmTest;

import org.junit.Test;

import java.util.concurrent.TimeUnit;

import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class InitializeTest extends RealmTest {

    @Test
    public void testAccessAppClient() {
        String appID = YOUR_APP_ID; // replace this with your App ID
        App app = new App(new AppConfiguration.Builder(appID).build());
    }

    @Test
    public void testAdvancedAccessAppClient() {
        String appID = YOUR_APP_ID; // replace this with your App ID
        App app = new App(new AppConfiguration.Builder(appID)
                .appName("My App")
                .requestTimeout(30, TimeUnit.SECONDS)
                .build());
    }
}