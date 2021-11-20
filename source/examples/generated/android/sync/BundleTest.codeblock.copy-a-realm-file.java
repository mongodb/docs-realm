// waitForInitialRemoteData only works with async calls -- use latch to wait for callback
CountDownLatch latch = new CountDownLatch(1);
activity.runOnUiThread (() -> {
    String appID = YOUR_APP_ID; // replace this with your App ID
    App app = new App(new AppConfiguration.Builder(appID)
            .build());
    Credentials anonymousCredentials = Credentials.anonymous();

    app.loginAsync(anonymousCredentials, it -> {
        if (it.isSuccess()) {
            Log.v("EXAMPLE", "Successfully authenticated anonymously.");
            String PARTITION = "PARTITION_YOU_WANT_TO_BUNDLE";

            // you can only create realm copies on a background thread with a looper.
            // HandlerThread provides a Looper-equipped thread.
            HandlerThread handlerThread = new HandlerThread("CopyARealmHandler");
            handlerThread.start();
            Handler handler = new Handler(handlerThread.getLooper());
            handler.post(new Thread(new Runnable() { @Override public void run() {
                SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
                        // wait for the realm to download all data from the backend before opening
                        .waitForInitialRemoteData()
                        .build();

                Realm.getInstanceAsync(config, new Realm.Callback() {
                    @Override
                    public void onSuccess(@NonNull Realm realm) {
                        Log.v("EXAMPLE", "Successfully opened a realm.");

                        // compact the realm to the smallest possible file size before making a copy
                        Realm.compactRealm(config);

                        // write a copy of the realm you can manually copy to your production application assets
                        File outputDir = activity.getApplicationContext().getCacheDir();
                        File outputFile = new File(outputDir.getPath() + "/" +  PARTITION + "_bundled.realm");

                        // cannot write to file if it already exists. Delete the file if already there
                        outputFile.delete();

                        realm.writeCopyTo(outputFile);

                        // search for this log line to find the location of the realm copy
                        Log.i("EXAMPLE", "Wrote copy of realm to " + outputFile.getAbsolutePath());

                        // always close a realm when you're done using it
                        realm.close();

                        // use the latch to allow this runnable to complete
                        latch.countDown();
                    }

                    @Override
                    public void onError(Throwable exception) {
                        Log.e("EXAMPLE", "Failed to open realm: " + exception.toString());
                    }
                });
            }}));
        } else {
            Log.e("EXAMPLE", "Failed to authenticate: " + it.getError().toString());
        }
    });
});

// block until the async calls succeed
try {
    Assert.assertTrue(latch.await(10, TimeUnit.SECONDS));
} catch (InterruptedException e) {
    Log.e("EXAMPLE", e.toString());
}
