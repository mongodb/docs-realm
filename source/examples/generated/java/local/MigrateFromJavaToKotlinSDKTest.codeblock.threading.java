realm = Realm.getInstance(config);
Sample sample = realm.where(Sample.class).findFirst();
// save sample field in a separate variable
// for access on another thread
String sampleStringField = sample.stringField;
ExecutorService executorService = Executors.newFixedThreadPool(4);
executorService.execute(new Runnable() {
    @Override
    public void run() {
        // cannot pass a realm into another thread,
        // so get a new instance for separate thread
        Realm realm = Realm.getInstance(config);
        // cannot access original sample on another
        // thread, so use sampleStringField instead
        Sample threadSample = realm.where(Sample.class)
                .equalTo("stringField",
                        sampleStringField).findFirst();
        Log.v("EXAMPLE",
                "Fetched sample on separate thread: " +
                        threadSample);
    }
});
