To wait for the session to finish uploading all pending changes, call
:flutter-sdk:`Session.waitForUpload() <realm/Session/waitForUpload.html>`.

To wait for the session to finish downloading all pending changes, call 
:flutter-sdk:`Session.waitForDownload() <realm/Session/waitForDownload.html>`.

Both of these sessions can take an optional :flutter-sdk:`CancellationToken 
<realm/CancellationToken-class.html>` to cancel the wait operation.
