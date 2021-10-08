To open a local (non-synced) {+realm+}, pass a :js-sdk:`Realm.Configuration
<Realm.html#~Configuration>` object to :js-sdk:`Realm.open()
<Realm.html#.open>`.

.. note:: Accessing the Default Realm Path

   If the ``path`` property is not specified in your ``Configuration`` object,
   the default path is used. You can access and change the default Realm path
   using the ``Realm.defaultPath`` global property.

.. literalinclude:: /examples/generated/node/open-and-close-a-local-realm.codeblock.open-local-realm-with-car-schema.js
  :language: javascript
  :emphasize-lines: 2

In the above example, the code shows how to open the {+realm+} *asynchronously*
by calling ``realm.open()``. You can also open a realm synchronously by passing
a ``Configuration object`` to a new instance of the :js-sdk:`Realm
<Realm.html>` object. Both ``new Realm()`` and ``Realm.open()`` have the the same 
behavior for local-only {+realm+}s.

.. literalinclude:: /examples/generated/node/open-and-close-a-realm.codeblock.open-local-realm-synchronously.js
  :language: javascript
  :emphasize-lines: 2
