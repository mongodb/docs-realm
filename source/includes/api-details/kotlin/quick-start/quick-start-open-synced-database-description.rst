Once you have initialized your Atlas App Services App, authenticated a user, and
defined your object model, you can create a :kotlin-sync-sdk:`SyncConfiguration
<io.realm.kotlin.mongodb.sync/-sync-configuration/index.html>`. 

If you have opened a non-synced database following the **Open a Database**
section on this page, replace the :kotlin-sdk:`RealmConfiguration
<io.realm.kotlin/-realm-configuration/index.html>` with
the ``SyncConfiguration`` described below.

Pass the authenticated user and the ``Item`` class to the 
:kotlin-sync-sdk:`SyncConfiguration.Builder
<io.realm.kotlin.mongodb.sync/-sync-configuration/-builder/index.html>`
function to create ``SyncConfiguration``.

.. important:: Initial Subscriptions

   You need at least one subscription before you can read from or write to the
   database. Use :kotlin-sync-sdk:`initialSubscriptions
   <io.realm.kotlin.mongodb.sync/-sync-configuration/-builder/initial-subscriptions.html>`
   to define the initial subscription set when you first open the database file.
   Pass the query you wish to subscribe to and a name for the subscription to
   the :kotlin-sync-sdk:`add()
   <io.realm.kotlin.mongodb.sync/-mutable-subscription-set/add.html>` function.

The example below specifies a subscription named "User's Items" with
all ``Item`` objects.
