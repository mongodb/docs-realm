Task task = new Task("New Task", partitionValue);
backgroundThreadRealm.executeTransaction (transactionRealm -> {
    transactionRealm.insert(task);
});