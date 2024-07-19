To monitor Sync progress, get the Sync session from the
:dotnet-sdk:`Realms.Sync.SyncSession 
<reference/Realms.Realm.html#Realms_Realm_SyncSession>` property, then add a 
progress notification by calling the 
:dotnet-sdk:`session.GetProgressObservable() <reference/Realms.Sync.Session.html#Realms_Sync_Session_GetProgressObservable_Realms_Sync_ProgressDirection_Realms_Sync_ProgressMode_>` 
method.

The ``session.GetProgressObservable`` method takes in the following two parameters:

- A :dotnet-sdk:`ProgressDirection <reference/Realms.Sync.ProgressDirection.html>` 
  parameter that can be set to ``Upload`` or ``Download``.
  
- A :dotnet-sdk:`ProgressMode <reference/Realms.Sync.ProgressMode.html>` parameter 
  that can be set to ``ReportIndefinitely``
  for the notifications to continue until the callback is unregistered, or 
  ``ForCurrentlyOutstandingWork`` for the notifications to continue until only 
  the currently transferable bytes are synced.

When you `Subscribe <https://docs.microsoft.com/en-us/dotnet/api/system.iobservable-1.subscribe?view=net-6.0#system-iobservable-1-subscribe(system-iobserver((-0)))>`_ 
to the notifications, you receive a 
:dotnet-sdk:`SyncProgress <reference/Realms.Sync.SyncProgress.html>` 
object that provides a percentage estimate of the current progress, expressed
as a double between 0.0 and 1.0.

Once you no longer wish to receive notifications, unregister the token with 
``token.Dispose()``.
