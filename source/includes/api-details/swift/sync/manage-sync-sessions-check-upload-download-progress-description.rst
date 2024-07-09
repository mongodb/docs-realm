.. versionchanged:: 10.50.0
   ``transferredBytes`` and ``transferrableBytes`` deprecated in favor of ``progressEstimate``

You can check upload and download progress by registering a token that provides
a ``progressEstimate`` for a given upload or download direction and work scope.
You can set a ``ProgressMode`` to determine the work scope: either observe
indefinitely or unregister the block after the current work item has completed.

The ``progressEstimate`` value provided by the token is a double whose value
ranges from ``0.0`` to ``1.0``. At ``1.0``, the upload or download is complete.
You can use this ``progressEstimate`` to display a progress indicator or
estimated data transfer percentage.

You can add a progress notification using the SyncSession instance's
:swift-sdk:`addProgressNotification(for:mode:block:)
<Extensions/SyncSession.html#/s:So14RLMSyncSessionC10RealmSwiftE23addProgressNotification3for4mode5blockSo011RLMProgressG5TokenCSgAbCE0F9DirectionO_AbCE0F4ModeOyAbCE0F0VctF>`
method.

This method returns a token that you should retain until you wish
to stop observing upload or download progress. Note that if you
keep the token in a local variable, observation will stop when the
local variable goes out of scope.
