To wait for all changes to upload or download from your synced database,
call :swift-sdk:`realm.syncSession?.wait(for: ) <Extensions/SyncSession.html#/s:So14RLMSyncSessionC10RealmSwiftE4wait3foryAbCE17ProgressDirectionO_tYaKF>`. 

This method takes a :swift-sdk:`ProgressDirection <Extensions/SyncSession/ProgressDirection.html>`
argument to specify whether to track upload or download progress.

You can use these methods with Swift's async/await syntax, or with the 
callback syntax. The callback version, 
:swift-sdk:`realm.syncSession?.wait(for:queue:block:) <Extensions/SyncSession.html#/s:So14RLMSyncSessionC10RealmSwiftE4wait3for5queue5blockyAbCE17ProgressDirectionO_So012OS_dispatch_G0CSgys5Error_pSgYbctF>`, 
can take a queue to dispatch the callback onto, and a block to invoke when 
waiting is complete.
