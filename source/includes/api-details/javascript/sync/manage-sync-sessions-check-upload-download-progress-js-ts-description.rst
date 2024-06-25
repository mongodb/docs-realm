To check the upload and download progress for a sync session, add a progress
notification using the :js-sdk:`syncSession.addProgressNotification() 
<classes/SyncSession.html#addProgressNotification>` method.

The ``syncSession.addProgressNotification()`` method takes in the following
three parameters:

- A ``direction`` parameter. 
  Set to ``"upload"`` to register notifications for uploading data. 
  Set to ``"download"`` to register notifications for downloading data.
- A ``mode`` parameter. Set to ``"reportIndefinitely"`` 
  for the notifications to continue until the callback is unregistered using
  :js-sdk:`syncSession.removeProgressNotification() <classes/SyncSession.html#removeProgressNotification>`.
  Set to ``"forCurrentlyOutstandingWork"`` for the notifications to continue
  until only the currently transferable bytes are synced.
- A callback function parameter.
