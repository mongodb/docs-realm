In the following example, the ``Frog`` object has a property named ``species`` 
in the code that is remapped to ``latin_name`` in the database:

.. literalinclude:: /examples/generated/kotlin/Schema.snippet.define-persisted-name.kt
   :language: kotlin

In the database, we can filter by either property name and return the same 
results.
