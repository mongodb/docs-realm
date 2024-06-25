After you have initialized your App, authenticated a user, and
defined your object model, you can create a :js-sdk:`SyncConfiguration
<types/FlexibleSyncConfiguration.html>`.

To open a synced database, call :js-sdk:`Realm.open() <classes/Realm-1.html#open>`. 
Pass in a :js-sdk:`BaseConfiguration <types/BaseConfiguration.html>`
object, which must include the ``sync`` property defining a 
:js-sdk:`SyncConfiguration <types/FlexibleSyncConfiguration.html>` object. 
In the ``SyncConfiguration``, you must include include a ``user`` and set
``flexible: true``.

Additionally, you need at least one subscription before you can read from or
write to the database. Use ``Configuration.sync.initialSubscriptions`` to
define the initial subscription set when the database file is first opened.
