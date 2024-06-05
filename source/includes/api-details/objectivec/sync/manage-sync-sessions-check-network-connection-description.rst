To get the connection state of a :dotnet-sdk:`SyncSession
<reference/Realms.Realm.html#Realms_Realm_SyncSession>`, set an event handler
on the :dotnet-sdk:`PropertyChanged <reference/Realms.Sync.Session.html#Realms_Sync_Session_PropertyChanged>`
event. The event handler is a standard
`.NET PropertyChangedEventHandler delegate
<https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.propertychangedeventhandler?view=net-6.0>`_
that takes in a ``sender`` object and
`PropertyChangedEventArgs <https://docs.microsoft.com/en-us/dotnet/api/system.componentmodel.propertychangedeventargs?view=net-6.0>`_
object. 

In the event handler, cast the sender to a ``Session`` object and check if 
the event argument's ``PropertyName`` property is ``Session.ConnectionState``. 
You can then get the
:dotnet-sdk:`ConnectionState <reference/Realms.Sync.Session.html#Realms_Sync_Session_ConnectionState>`
value, which is one of the following:

- Connecting
- Connected
- Disconnected

The following code demonstrates setting the event handler, casting the session
object, and checking the Sync status:
