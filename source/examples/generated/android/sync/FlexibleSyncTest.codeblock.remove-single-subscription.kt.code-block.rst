.. code-block:: kotlin
   :emphasize-lines: 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1

   realm.subscriptions.update { subscriptions ->
       val mySubscription =
           subscriptions.find("mySubscription")
       subscriptions.remove(mySubscription)
   }
