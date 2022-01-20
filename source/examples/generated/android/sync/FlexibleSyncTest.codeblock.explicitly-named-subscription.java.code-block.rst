.. code-block:: java
   :emphasize-lines: 1, 1, 2, 3, 2, 3

   subscriptions.add(Subscription.create("frogSubscription",
           realm.where(Frog.class) 
               .equalTo("species", "spring peeper"))); 

   // later, you can look up this subscription by name
   Subscription subscription = subscriptions.find("frogSubscription");
