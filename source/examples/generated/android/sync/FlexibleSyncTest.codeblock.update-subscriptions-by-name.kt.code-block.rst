.. code-block:: kotlin
   :emphasize-lines: 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1

   realm.subscriptions.update { subscriptions -> // to update a named subscription, create a replacement with
       // the same name and add it to the subscription set
       subscriptions.addOrUpdate(
           Subscription.create(
               "mySubscription",
               realm.where(Frog::class.java)
                   .equalTo(
                       "name",
                       "Benedict Cumberburger"
                   )
           )
       )
   }
