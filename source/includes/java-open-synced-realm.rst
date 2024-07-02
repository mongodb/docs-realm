To open a synced database, call 
:java-sdk:`getInstanceAsync()
<io/realm/Realm.html#getInstanceAsync-io.realm.RealmConfiguration-io.realm.Realm.Callback->`, 
passing in a :java-sdk:`SyncConfiguration <io/realm/mongodb/sync/SyncConfiguration.html>` 
object.

You can also open a database synchronously by using :java-sdk:`getInstance()
<io/realm/Realm.html#getInstance-io.realm.RealmConfiguration->`, which
returns an open database before synchronizing all data from the backend.
However, this may lead to temporary data inconsistencies while the
remote data is downloaded, and is generally not recommended. You can
use the :java-sdk:`waitForInitialRemoteData() <io/realm/mongodb/sync/SyncConfiguration.Builder.html#waitForInitialRemoteData-->`
configuration option to force the SDK to fetch remote data before
opening the database to avoid these inconsistencies.

The following code demonstrates how to create a database with 
specific sync settings created using a ``SyncConfiguration`` object:
