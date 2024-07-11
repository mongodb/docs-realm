When you do need specify the desired sync behavior, configure the
:flutter-sdk:`waitForSyncMode <realm/WaitForSyncMode.html>` option. 

This example uses the ``firstTime`` option, which is the default behavior.
A subscription with ``firstTime`` behavior only waits for sync to finish when a
subscription is first created.

.. literalinclude:: /examples/generated/flutter/manage_sync_subscription_test.snippet.wait-first-time-subscribe-api.dart
   :language: dart
   :emphasize-lines: 5

The other supported ``waitForSyncMode`` options are:

- ``always``: Wait to download matching objects every time your app launches.
  The app must have an internet connection at every launch.
- ``never``: Never wait to download matching objects. The app needs an internet
  connection for the user to authenticate the first time the app launches, but
  can open offline on subsequent launches using cached credentials.

You can optionally specify a :flutter-sdk:`cancellationToken <realm/CancellationToken-class.html>` 
to limit how long the sync download runs.
