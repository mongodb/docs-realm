To open a realm with Partition-Based Sync, call :js-sdk:`Realm.open() <Realm.html#.open>`. 
Pass in a :js-sdk:`Configuration <Realm.html#~Configuration>`
object, which must include the ``sync`` property defining a 
:js-sdk:`SyncConfiguration <Realm.App.Sync.html#~SyncConfiguration>` object. 
In the SyncConfiguration, you must include include ``user`` and ``partitionValue``.