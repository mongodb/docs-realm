To monitor Sync upload and download progress, call 
:kotlin-sync-sdk:`SyncSession.progressAsFlow() 
<io.realm.kotlin.mongodb.sync/-sync-session/progress-as-flow.html>`.

This method returns a Flow of :kotlin-sync-sdk:`Progress
<io.realm.kotlin.mongodb.sync/-progress/index.html>` events. ``Progress``
provides an ``estimate``, a double, that represents a transfer progress
estimate that ranges from 0.0 to 1.0. It also provides an
``isTransferComplete`` bool.

``syncSession.progressAsFlow()`` takes two arguments:

- A :kotlin-sync-sdk:`Direction <io.realm.kotlin.mongodb.sync/-direction/index.html>`
  enum that can be set to ``UPLOAD`` or ``DOWNLOAD``.
  This specifies that the progress stream tracks uploads or downloads.

- A :kotlin-sync-sdk:`ProgressMode
  <io.realm.kotlin.mongodb.sync/-progress-mode/index.html>` enum that can be
  set to either: 
  
  - ``INDEFINITELY``: Sets notifications to continue until the callback is 
    unregistered.
  - ``CURRENT_CHANGES``: Sets notifications to continue until only the currently 
    transferable bytes are synced.
