realm.executeTransaction(r -> {
    r.deleteAll();
    expectation.fulfill();
});