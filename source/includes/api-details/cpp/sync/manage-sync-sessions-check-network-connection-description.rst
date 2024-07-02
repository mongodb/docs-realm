**Check Connection State**

To check the connection state, you can read the  
:cpp-sdk:`sync session instance's <structrealm_1_1internal_1_1bridge_1_1sync__session.html>`
``connection_state()`` property directly.

.. literalinclude:: /examples/generated/cpp/sync-session.snippet.connection-state.cpp
   :language: cpp

The network connection state is distinct from the Device Sync connection state
that you can check with the ``state()`` method. For more information about
sync connection state, refer to the Check the Sync State documentation on 
this page.

**Observe Connection State**

You can also observe the connection state with the 
:cpp-sdk:`observe_connection_change() <structrealm_1_1internal_1_1bridge_1_1sync__session.html#a38096e71024b3fd252d3356af5eee113>`
function. This function registers a callback that the SDK invokes when the 
underlying sync session changes its connection state. 

.. literalinclude:: /examples/generated/cpp/sync-session.snippet.observe-connection-change.cpp
   :language: cpp

If you register a connection change listener, you can unregister it when 
you're done listening for changes. Call the sync session instance's
:cpp-sdk:`unregister_connection_change_observer() <structrealm_1_1internal_1_1bridge_1_1sync__session.html#a86b911bc662f02f607c5e9513d80c0c7>`
method to unregister an observation token.
