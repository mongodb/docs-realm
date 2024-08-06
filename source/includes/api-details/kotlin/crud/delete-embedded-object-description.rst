.. tip:: Get Embedded Object's Parent

   You can get the unique parent of an embedded object using 
   :kotlin-sdk:`parent() <io.realm.kotlin.ext/parent.html>`.

In the following example, we have a ``Business`` object with a list of 
embedded ``EmbeddedAddress`` objects. We query for and delete the ``Business`` object, 
which automatically deletes all of its embedded ``EmbeddedAddress`` objects:

.. literalinclude:: /examples/generated/kotlin/DeleteTest.snippet.delete-embedded-object-through-parent.kt
   :language: kotlin

In the following example, we have ``Contact`` objects with embedded 
``EmbeddedAddress`` objects. We delete an ``EmbeddedAddress`` object directly and delete 
another through the parent object:
