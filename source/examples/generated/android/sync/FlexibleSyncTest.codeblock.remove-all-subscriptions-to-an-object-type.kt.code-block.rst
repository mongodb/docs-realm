.. code-block:: kotlin

   realm.subscriptions.update { subscriptions ->
       subscriptions.removeAll(
           Frog::class.java
       )
   }
