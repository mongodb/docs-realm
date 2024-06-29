In the Kotlin SDK, define an SDK object as a Kotlin class. Each object class
represents an **object type**.

SDK objects *must* inherit from the ``RealmObject`` class or its
subclasses: ``EmbeddedRealmObject`` or ``AsymmetricRealmObject``.
The Kotlin SDK does *not* support inheritance from custom base classes.

Additionally, the Kotlin SDK does *not* support using Kotlin
`data classes <https://kotlinlang.org/docs/data-classes.html>`__ to model
data. This is because data classes are typically used for immutable data,
which goes against how the Kotlin SDK models data.

**Kotlin SDK Requires an Empty Constructor**

The Kotlin SDK requires that SDK objects have an empty constructor.

If you cannot provide an empty constructor, as a workaround, you can do
something similar to the following:

.. code-block:: kotlin
   :copyable: false

   class Person(var name: String, var age: Int): RealmObject {
        constructor(): this("", 0) // Empty constructor required by the SDK
   }
