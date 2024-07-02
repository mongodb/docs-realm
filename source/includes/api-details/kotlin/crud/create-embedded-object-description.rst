In the following example, we instantiate a new  ``Contact`` object with 
an embedded ``Address``, which contains a ``Contact`` object and an embedded
``Country`` object:

.. literalinclude:: /examples/generated/kotlin/CreateTest.snippet.create-one-embedded-object.kt 
    :language: kotlin

We also instantiate a new ``Business`` object with a 
list of embedded ``Address`` objects, which also contain ``Contact`` 
objects and embedded ``Country`` objects:
