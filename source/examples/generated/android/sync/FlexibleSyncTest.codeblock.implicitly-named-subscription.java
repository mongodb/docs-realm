subscriptions.add(Subscription.create(null,
        realm.where(Frog.class) 
                .equalTo("species", "spring peeper"))); 

// later, you can look up this subscription by query
Subscription subscription = subscriptions.find(realm.where(Frog.class)
    .equalTo("species", "spring peeper"));
