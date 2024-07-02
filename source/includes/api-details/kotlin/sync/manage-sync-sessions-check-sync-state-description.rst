You can check the Sync session state through the 
:kotlin-sync-sdk:`SyncSession.State
<io.realm.kotlin.mongodb.sync/-sync-session/-state/index.html>`. This is a
property of type State enum, whose possible values are:

- INACTIVE
- ACTIVE
- PAUSED
- DYING
- WAITING_FOR_ACCESS_TOKEN
