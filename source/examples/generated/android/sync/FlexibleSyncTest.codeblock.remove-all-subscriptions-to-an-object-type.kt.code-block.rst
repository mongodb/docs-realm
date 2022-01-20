.. code-block:: kotlin
   :emphasize-lines: 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1

   realm.subscriptions.update { subscriptions ->
       subscriptions.removeAll(
           Frog::class.java
       )
   }
