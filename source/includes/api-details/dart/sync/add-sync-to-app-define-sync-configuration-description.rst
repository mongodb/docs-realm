Device Sync requires a :flutter-sdk:`FlexibleSyncConfiguration 
<realm/FlexibleSyncConfiguration-class.html>`
object to open a synced database. Note that 
this is different than the :flutter-sdk:`Configuration
<realm/Configuration-class.html>` object that specifies some of the
base database options.

The ``FlexibleSyncConfiguration`` object requires an authenticated **User**.

For additional database configuration parameters, refer to 
:ref:`sdks-configure-and-open-synced-database`.

For our example app, we define a configuration to manage objects conforming to
``Car.schema``.
