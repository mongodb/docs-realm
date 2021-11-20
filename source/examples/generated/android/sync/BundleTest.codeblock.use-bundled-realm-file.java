String appID = YOUR_APP_ID; // replace this with your App ID

App app = new App(new AppConfiguration.Builder(appID)
        .build());

Credentials anonymousCredentials = Credentials.anonymous();

app.loginAsync(anonymousCredentials, it -> {
    if (it.isSuccess()) {
        Log.v("EXAMPLE", "Successfully authenticated anonymously.");

        // asset file name should correspond to the name of the bundled file
        SyncConfiguration config = new SyncConfiguration.Builder(
                    app.currentUser(),
                    "PARTITION_YOU_WANT_TO_BUNDLE")
                .assetFile("example_bundled.realm") 
                .build();

        Realm.getInstanceAsync(config, new Realm.Callback() {
            @Override
            public void onSuccess(@NonNull Realm realm) {
                Log.v("EXAMPLE", "Successfully opened bundled realm.");

                // read and write to the bundled realm as normal
                realm.executeTransactionAsync(transactionRealm -> {
                    Frog frog = new Frog(new ObjectId(),
                            "Asimov",
                            4,
                            "red eyed tree frog",
                            "Spike");
                    transactionRealm.insert(frog);
                    expectation.fulfill();
                });
            }

            @Override
            public void onError(Throwable exception) {
                Log.e("EXAMPLE", "Realm opening failed: " + exception.toString());
            }
        });
    } else {
        Log.e("EXAMPLE", "Failed to authenticate: " + it.getError().toString());
    }
});
