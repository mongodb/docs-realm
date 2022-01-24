.. code-block:: java

   subscriptions.add(Subscription.create("frogSubscription",
           realm.where(Frog.class)
               .equalTo("species", "spring peeper")));

   // later, you can look up this subscription by name
   Subscription subscription = subscriptions.find("frogSubscription");
