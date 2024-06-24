Pass a logged-in user's :swift-sdk:`configuration <Structs/Realm/Configuration.html>` 
object with the desired :ref:`partition value <partition-value>` to 
:swift-sdk:`realm initializers 
<Structs/Realm.html#/s:10RealmSwift0A0V13configuration5queueA2C13ConfigurationV_So012OS_dispatch_D0CSgtKcfc>`.

You can optionally :ref:`specify whether a database should download 
changes before opening <sdks-download-changes-before-open>`. If you do not
specify download behavior, this opens a database with data that is on
the device, and attempts to sync changes in the background.
