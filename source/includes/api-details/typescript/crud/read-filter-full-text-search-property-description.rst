To query an FTS indexed property, use the ``TEXT`` predicate in your
:js-sdk:`filtered <classes/Results.html#filtered>` query. 

In the following example, we query on the ``Book.name`` field using the 
following ``Book`` object model.

.. literalinclude:: /examples/generated/node/v12/full-text-search.test.snippet.node-fts-annotation.ts
  :language: typescript
