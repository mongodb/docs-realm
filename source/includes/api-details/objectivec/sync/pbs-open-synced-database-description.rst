The first time you log in and open a synced database, log in the
user, and pass the user's :objc-sdk:`RLMSyncConfiguration 
<Classes/RLMRealmConfiguration.html#/c:objc(cs)RLMRealmConfiguration(py)syncConfiguration>` 
object with the desired :objc-sdk:`partitionValue 
<Classes/RLMSyncConfiguration.html#/c:objc(cs)RLMSyncConfiguration(py)partitionValue>` 
to :objc-sdk:`+[RLMRealm realmWithConfiguration:error:]
<Classes/RLMRealm.html#/c:objc(cs)RLMRealm(cm)realmWithConfiguration:error:>`.

This opens a synced database on the device. The database
attempts to sync with your App in the background to check for changes 
on the server, or upload changes that the user has made.
