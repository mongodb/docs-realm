To initialize a :js-sdk:`Counter <classes/Realm.Types.Counter.html>`, create
your object using the ``realm.create()`` method. Pass in your :ref:`object
schema <sdks-object-schema>` and initial counter value, as well as initial
values for any other properties the object has.

After initialization, you can use the following methods to modify the counter
value:

- ``increment()`` and ``decrement()`` update the underlying value by a
  specified number.
- ``set()`` reassigns the counter to a specified value.

.. tabs-realm-languages::

    .. tab::
      :tabid: typescript
    
      .. literalinclude:: /examples/generated/node/data-types.test.snippet.initialize-counter.ts 
          :language: typescript
    
    .. tab::
      :tabid: javascript

      .. literalinclude:: /examples/generated/node/data-types.test.snippet.initialize-counter.js
          :language: javascript

