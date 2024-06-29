To embed an object, set the ``embedded`` property of the
:java-sdk:`@RealmClass <io/realm/annotations/RealmClass.html#embedded-->`
annotation to ``true`` on the class that you'd like to nest within
another class:

.. include:: /examples/generated/java/local/FlyEmbeddedExampleKt.snippet.complete.kt.rst

Then, any time you reference that class from another class,
the SDK embeds the referenced class within the enclosing
class, as in the following example:
