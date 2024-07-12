You can bootstrap the database with an initial subscription set when you open
it with the 
:kotlin-sync-sdk:`SyncConfiguration() <io.realm.kotlin.mongodb.sync/-sync-configuration/index.html>`.

Pass the ``initialSubscriptions`` parameter with the 
subscription queries you want to use to bootstrap the database:

.. literalinclude:: /examples/generated/kotlin/SyncTest.snippet.initialize-subscribe-query-realm-app.kt
   :language: kotlin

If your app needs to rerun this initial subscription every 
time the app starts, you can pass an additional parameter: 
``rerunOnOpen``. This is a boolean that denotes whether the 
initial subscription should re-run every time the 
app starts. You might need to do this to re-run dynamic time 
ranges or other queries that require a re-computation of 
static variables for the subscription.

In this example, we only want incomplete tasks. With
``rerunOnOpen`` set to ``true``, the query dynamically 
recalculates the relevant objects to sync based on the 
desired query results every time the app starts.
