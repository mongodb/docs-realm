To open a synced {+realm+}, call :js-sdk:`Realm.open() <Realm.html#.open>`. 
Pass in a :js-sdk:`Configuration <Realm.html#~Configuration>`
object, which must include the ``sync`` property defining a 
:js-sdk:`SyncConfiguration <Realm.App.Sync.html#~SyncConfiguration>` object. 
In the SyncConfiguration, you must include include ``user`` and ``partitionValue``.

When opening a synced {+realm+}, the configuration you use depends on the initial sync behavior you want. You can connect to a synced {+realm+} in the following ways: 

- :ref:`Sync all data before returning <react-native-sync-all-data-before-returning>`
- :ref:`Return after a timeout with background sync <react-native-return-after-timeout-with-background-sync>`
- :ref:`Open immediately with background sync <react-native-open-immediately-with-background-sync>`
