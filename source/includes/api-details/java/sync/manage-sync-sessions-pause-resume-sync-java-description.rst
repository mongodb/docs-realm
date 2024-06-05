To pause a currently active sync session, call
:java-sdk:`stop() <io/realm/mongodb/sync/SyncSession.html#stop-->`
on your :java-sdk:`SyncSession <io/realm/mongodb/sync/SyncSession.html>`:

.. literalinclude:: /examples/generated/java/sync/SyncDataTest.snippet.pause-sync-session.java
   :language: java
   :copyable: false

To resume a currently paused sync session, call
:java-sdk:`start() <io/realm/mongodb/sync/SyncSession.html#start-->`
on your :java-sdk:`SyncSession <io/realm/mongodb/sync/SyncSession.html>`:
