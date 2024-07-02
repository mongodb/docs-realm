You can get the state of the current network connection with
:flutter-sdk:`Session.connectionState <realm/Session/connectionState.html>`.
This returns a :flutter-sdk:`ConnectionState <realm/ConnectionState.html>` enum
that contains the network connection's state, which is one of:

- ``connected``
- ``disconnected``
- ``connecting``

.. literalinclude:: /examples/generated/flutter/manage_sync_session_test.snippet.get-network-connection.dart
   :language: dart

Monitor the state of the network connection with
:flutter-sdk:`Session.connectionStateChanges <realm/Session/connectionStateChanges.html>`.
This property returns a Stream of :flutter-sdk:`ConnectionStateChange <realm/ConnectionStateChange-class.html>`
objects that updates when the network connection changes.
You can access the current and previous ``ConnectionState`` from ``ConnectionStateChange``.
