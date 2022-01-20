.. code-block:: kotlin
   :emphasize-lines: 1, 1, 4, 7, 4, 7

   subscriptions.add(
       Subscription.create(
           "frogSubscription",
           realm.where(Frog::class.java) 
               .equalTo("species", "spring peeper")
       )
   ) 

   // later, you can look up this subscription by name
   val subscription =
       subscriptions.find("frogSubscription")
