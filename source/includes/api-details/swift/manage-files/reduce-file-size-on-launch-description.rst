Use :swift-sdk:`shouldCompactOnLaunch()<Structs/Realm/Configuration.html>` 
on a database's configuration object to compact a database. 
Specify conditions to execute this method, such as:

- The size of the file on disk
- How much free space the file contains

For more information about the conditions to execute in the method, see:
:ref:`sdks-compaction-tips`.

.. important:: Compacting may not occur

    Compacting cannot occur while a database is being accessed, 
    regardless of any configuration settings.

.. literalinclude:: /examples/generated/code/start/Compacting.snippet.compacting.swift
    :language: swift

When you use the Swift async/await syntax to open a database asynchronously, you can also 
compact a database file in the background.
