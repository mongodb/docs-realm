.. versionchanged:: 10.50.0
   ``addProgressNotificationForDirection`` deprecated in favor of ``addSyncProgressNotificationForDirection``

You can add a progress notification using the RLMSyncSession instance's
:objc-sdk:`[--addSyncProgressNotificationForDirection:mode:block:]
<Classes/RLMSyncSession.html#/c:objc(cs)RLMSyncSession(im)addSyncProgressNotificationForDirection:mode:block:>`
method.

This method returns a token that you should retain until you wish
to stop observing upload or download progress. Note that if you
keep the token in a local variable, observation will stop when the
local variable goes out of scope.
