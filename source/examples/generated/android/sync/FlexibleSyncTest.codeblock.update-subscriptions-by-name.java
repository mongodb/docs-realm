realm.getSubscriptions().update(new SubscriptionSet.UpdateCallback() {
    @Override
    public void update(MutableSubscriptionSet subscriptions) {
        // to update a named subscription, create a replacement with
        // the same name and add it to the subscription set
        subscriptions.addOrUpdate(
                Subscription.create("mySubscription",
                        realm.where(Frog.class)
                            .equalTo("name",
                                    "Benedict Cumberburger")));
    }
});
