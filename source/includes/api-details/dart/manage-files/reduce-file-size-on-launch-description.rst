You can define a :flutter-sdk:`shouldCompactCallback()
<realm/LocalConfiguration/shouldCompactCallback.html>` as a property of a
database's configuration. You can use this with both local-only and synced databases
with the :flutter-sdk:`Configuration.local() <realm/Configuration/local.html>`
and :flutter-sdk:`Configuration.flexibleSync() <realm/Configuration/flexibleSync.html>`
methods, respectively.

This callback takes two ``int`` values representing the total number of 
bytes and the used bytes of the database file on disk. The callback returns 
a ``bool``. Compaction only occurs if the ``bool`` returns ``true`` and 
another process is not currently accessing the database file.

The most basic usage is to define a file size at which compaction should occur.

.. literalinclude:: /examples/generated/flutter/compact_realm_test.snippet.compact-with-callback.dart
    :language: dart

You can define more complex logic if you need to optimize performance for 
different use cases. For example, you could set a threshold for compaction
when a certain percentage of the file size is used.
