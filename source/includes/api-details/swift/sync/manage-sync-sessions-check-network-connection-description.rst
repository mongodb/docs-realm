To check the connection state, you can read the ``SyncSession`` instance's
:swift-sdk:`connectionState
<Extensions/SyncSession.html#/s:So14RLMSyncSessionC10RealmSwiftE15ConnectionStatea>`
property directly. 

This property is :apple:`KVO-compliant
<library/archive/documentation/Cocoa/Conceptual/KeyValueObserving/KeyValueObserving.html>`,
so you can observe changes using KVO or even Combine.
