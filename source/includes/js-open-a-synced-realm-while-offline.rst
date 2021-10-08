Open a Synced Realm While Offline
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If a user's device is not connected to the internet, there are a variety of ways 
to connect to the local {+realm+}. 

If you're certain that the device doesn't have internet access, connect to the 
local {+realm+} immediately using the ``new Realm()`` method, as described in the
:ref:`Open a Local Realm <node-open-a-local-realm>` section above. 

If you're uncertain if the device is connected to the internet, configure the
device's behavior if it's unable to synchronize in a specified time period. Configure this 
timeout behavior in the :js-sdk:`Configuration <Realm.html#~Configuration>`
object passed to ``Realm.open()``. In the ``sync`` property, add ``newRealmFileBehavior``
and ``existingRealmFileBehavior`` properties with a :js-sdk:`OpenRealmBehaviorConfiguration <Realm.App.Sync.html#~OpenRealmBehaviorConfiguration>`
object set to have a ``timeOut`` value and ``timeOutBehavior: 'openLocalRealm'``.
For example: 


.. literalinclude:: /examples/generated/node/open-and-close-a-realm.codeblock.open-synced-realm-config.js
  :language: javascript


You can further direct the control flow based on if the device is online by using 
the :js-sdk:`syncSession methods<Realm.App.Sync.Session.html>` 
on your Realm object. 

.. example::
  
  In the following example, a synced {+realm+} is opened with a 
  a ``Configuration`` object that uses a predefined
  ``TaskSchema`` :doc:`schema </sdk/node/examples/define-a-realm-object-model>`, 
  the currently logged in user, a partition value of "MyPartition", and a 
  :js-sdk:`SyncConfiguration <Realm.App.Sync.html#~SyncConfiguration>` with 
  ``existingRealmFileBehavior`` and ``newRealmFileBehavior`` set to allow the user 
  to work with a local {+realm+} if the device is offline.  

  The example also includes using ``syncSession`` to regulate the control flow.  

  .. literalinclude:: /examples/generated/node/open-and-close-a-realm.codeblock.open-synced-realm-offline-with-car-schema.js
    :language: javascript