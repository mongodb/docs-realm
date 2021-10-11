To open a local (non-synced) {+realm+}, pass a :js-sdk:`Realm.Configuration
<Realm.html#~Configuration>` object to the asynchronous method :js-sdk:`Realm.open()
<Realm.html#.open>`.

.. note:: Accessing the Default Realm Path

   If the ``path`` property is not specified in your ``Configuration`` object,
   the default path is used. You can access and change the default Realm path
   using the ``Realm.defaultPath`` global property.

.. literalinclude:: /examples/generated/node/open-and-close-a-realm.codeblock.open-local-realm-with-car-schema.js
  :language: javascript
