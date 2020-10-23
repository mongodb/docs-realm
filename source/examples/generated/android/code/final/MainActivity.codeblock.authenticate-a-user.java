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
    } else {
        Log.e("QUICKSTART", "Failed to log in. Error: " + result.getError());
    }
});