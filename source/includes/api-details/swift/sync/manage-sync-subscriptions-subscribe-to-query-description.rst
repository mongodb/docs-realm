Use the :swift-sdk:`.subscribe() 
<Structs/Results.html#/s:10RealmSwift7ResultsV9subscribe4name11waitForSync7timeoutACyxGSSSg_So07RLMWaitgH4ModeVSdSgtYaKF>` 
method to create a subscription for objects matching the query.

.. literalinclude:: /examples/generated/code/start/FlexibleSync.snippet.subscribe-to-results-unnamed.swift
   :language: swift

Subscribe to an Actor-Confined Query
````````````````````````````````````

You can subscribe to actor-confined queries. For more information about
working with actor-confined database instances, refer to
:ref:`swift-actor-isolated-realm`.

You can subscribe to an actor-confined query on the MainActor.

.. literalinclude:: /examples/generated/code/start/FlexibleSync.snippet.subscribe-to-results-on-main-actor.swift
   :language: swift

Or subscribe to a query on a custom actor.
