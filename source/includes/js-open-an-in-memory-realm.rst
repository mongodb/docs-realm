Open an In-Memory Realm
-----------------------
To create a realm that runs entirely in memory without being written to a file,
add ``inMemory: true`` to your :js-sdk:`Realm.Configuration
<Realm.html#~Configuration>` object:

.. literalinclude:: /examples/generated/node/open-and-close-a-realm.codeblock.open-and-close-an-in-memory-realm.js
   :language: javascript

.. note:: 

   In-memory {+realms+} may use disk space if memory is running low, but files
   created by an in-memory {+realm+} are deleted when you close the {+realm+}.