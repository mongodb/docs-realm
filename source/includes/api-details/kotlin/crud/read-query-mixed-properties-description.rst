In the following example, we query a ``RealmAny`` property called 
``favoriteThing`` for a frog with a favorite thing of type ``Int``:

.. literalinclude:: /examples/generated/kotlin/ReadTest.snippet.query-realmany-property.kt
   :language: kotlin

Unlike other properties, you must extract a ``RealmAny`` property's stored 
value before you can work with it. To extract the value, use 
the SDK's getter method for the stored type. If you use the wrong getter for 
the type, the SDK throws an exception. 

A best practice is to use a conditional expression to get the currently stored 
type with :kotlin-sdk:`RealmAny.type() <io.realm.kotlin.types/-realm-any/type.html>`, 
then extract the value based on the type. For a full list of getter 
methods, refer to the :kotlin-sdk:`RealmAny
<io.realm.kotlin.types/-realm-any/index.html>` API reference.

.. tip:: Handle Polymorphism with Conditional Expressions

   Use a conditional ``when`` expression to handle the possible inner value 
   class of a given ``RealmAny`` property:

   .. literalinclude:: /examples/generated/kotlin/ReadTest.snippet.polymorphism.kt
      :language: kotlin

Once you have the currently stored value, you can work with it the same way you 
would another value of that type. 

.. note:: 
   
   ``Byte``, ``Char``, ``Int``, ``Long``, and ``Short`` values are converted 
   internally to ``int64_t`` values. Keep this in mind when comparing, 
   sorting, or aggregating ``RealmAny`` values of these types.

In the following example, we extract the value using
:kotlin-sdk:`RealmAny.asInt() <io.realm.kotlin.types/-realm-any/as-int.html>`
since we know the returned frog's favorite thing is an ``Int`` type value.
