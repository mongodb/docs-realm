Open a Synced Realm
-------------------

If you're opening a synced {+realm+}, the method you should use depends on whether 
or not the user's device is connected to the internet. Learn how to handle different
connection states in the :ref:`Open a Synced Realm While Online <node-open-a-synced-realm-while-online>` 
and :ref:`Open a Synced Realm While Offline <node-open-a-synced-realm-while-offline>` 
sections.

.. note::

   The first time a user logs on to your {+realm+} app, you should open the {+realm+} 
   *asynchronously* using the methods described in the below 
   :ref:`Open a Synced Realm While Online <node-open-a-synced-realm-while-online>`
   to sync data from the server to the device. After that initial connection, you 
   can open the synced {+realm+} using the methods described in the 
   :ref:`Open a Synced Realm While Offline <node-open-a-synced-realm-while-offline>` 
   section.