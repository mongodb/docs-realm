Open a Synced Realm While Online
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To open a synced {+realm+} while online, call :js-sdk:`Realm.open() <Realm.html#.open>`. 
Pass in a :js-sdk:`Configuration <Realm.html#~Configuration>`
object, which must include the ``sync`` property defining a 
:js-sdk:`SyncConfiguration <Realm.App.Sync.html#~SyncConfiguration>` object.

.. example::

   In the following example, an online synced {+realm+} is opened with a 
   ``SyncConfiguration`` object that uses a predefined
   ``TaskSchema`` :doc:`schema </sdk/node/examples/define-a-realm-object-model>`, 
   the currently logged in user, and a partition value of "MyPartition".

   .. literalinclude:: /examples/SyncChanges/open-a-synced-realm.js
      :language: javascript

.. warning::

   The ``Realm.open()`` function requires a different :js-sdk:`Configuration <Realm.html#~Configuration>`
   object if you are attempting to synchronize a {+realm+} while not connected to 
   the internet. Refer to the :ref:`Node Open a Synced Realm While Offline <node-open-a-synced-realm-while-offline>`
   documentation for more information about connecting to your offline {+realm+}. 