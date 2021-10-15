To open a synced {+realm+}, call :js-sdk:`Realm.open() <Realm.html#.open>`. 
Pass in a :js-sdk:`Configuration <Realm.html#~Configuration>`
object, which must include the ``sync`` property defining a 
:js-sdk:`SyncConfiguration <Realm.App.Sync.html#~SyncConfiguration>` object. 

When opening a synced {+realm+}, the configuration you use depends on the behavior you want
for syncing the client with the server. The ways to connect 
to a synced {+realm+} are: 

- :ref:`Syncing all data before returning <react-native-sync-all-data-before-returning>`
- :ref:`Returning after a timeout with background sync <react-native-return-after-timeout-with-background-sync>`
- :ref:`Opening immediately with background sync <react-native-open-immediately-with-background-sync>`
