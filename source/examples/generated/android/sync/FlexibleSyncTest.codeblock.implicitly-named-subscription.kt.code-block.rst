.. code-block:: kotlin
   :emphasize-lines: 1, 1, 1, 1, 1, 1, 4, 7, 4, 7

   subscriptions.add(
       Subscription.create(
           null,
           realm.where(Frog::class.java) 
               .equalTo("species", "spring peeper")
       )
   ) 

   // later, you can look up this subscription by query
   val subscription =
       subscriptions.find(
           realm.where(
               Frog::class.java
           )
               .equalTo("species", "spring peeper")
       )
