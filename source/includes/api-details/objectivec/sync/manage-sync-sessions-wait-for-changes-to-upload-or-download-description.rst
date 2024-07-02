To wait for all changes to upload or download from your synced database, call:

- Upload: :objc-sdk:`RLMRealm.waitForUploadCompletionOnQueue:callback: <Classes/RLMSyncSession.html#/c:objc(cs)RLMSyncSession(im)waitForUploadCompletionOnQueue:callback:>`.
- Download: :objc-sdk:`RLMRealm.waitForUploadCompletionOnQueue:callback: <Classes/RLMSyncSession.html#/c:objc(cs)RLMSyncSession(im)waitForDownloadCompletionOnQueue:callback:>`.

These methods take a callback, which they dispatch onto the specified queue
after the work item completes or the session expires.
