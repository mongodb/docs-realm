To open a synced {+realm+}, call :js-sdk:`Realm.open() <Realm.html#.open>`. 
Pass in a :js-sdk:`Configuration <Realm.html#~Configuration>`
object, which must include the ``sync`` property defining a 
:js-sdk:`SyncConfiguration <Realm.App.Sync.html#~SyncConfiguration>` object.


.. example::

   In the following example, a synced {+realm+} is opened with a :doc:`schema
   </sdk/node/examples/define-a-realm-object-model>` value of a predefined
   ``TaskSchema`` ``SyncConfiguration`` object that uses the currently logged in
   user  and a partition value of "MyPartition".

   .. literalinclude:: /examples/SyncChanges/open-a-synced-realm.js
      :language: javascript