The Kotlin SDK implements the :kotlin-sdk:`RealmLogger 
<-realm-logger/index.html>` interface for custom loggers.

.. literalinclude:: /examples/generated/kotlin/SyncTest.snippet.define-custom-logger.kt
  :language: kotlin

In the Kotlin SDK, use :kotlin-sdk:`RealmLog.add() <-realm-log/add.html>`
to set your custom logger as a logger for your app.

You can also remove a specific logger or remove all loggers, including the
system logger.
