Typically, incrementing or decrementing a
``byte``, ``short``, ``int``, or ``long`` field of a Realm
object looks something like this:

1. Read the current value of the field.
#. Update that value in memory to a new value based on the increment or
   decrement.
#. Write a new value back to the field.

When multiple distributed clients attempt this at the same time,
updates reaching clients in different orders can
result in different values on different clients. ``MutableRealmInteger``
improves on this by translating numeric updates into sync operations
that can be executed in any order to converge to the same value.

The :java-sdk:`counter.increment() <io/realm/MutableRealmInteger.html#increment-long->`
and :java-sdk:`counter.decrement() <io/realm/MutableRealmInteger.html#decrement-long->`
operators ensure that increments and decrements from multiple distributed
clients are aggregated correctly.

To change a :java-sdk:`MutableRealmInteger
<io/realm/MutableRealmInteger.html>` value, call ``increment()`` or
``decrement()`` within a write transaction.

You can assign a ``MutableRealmInteger`` a new value with a call to
:java-sdk:`counter.set() <io/realm/MutableRealmInteger.html#set-long->`
within a write transaction.

.. warning:: Counter Resets

   Use the ``set()`` operator with extreme care. ``set()`` ignores
   the effects of any prior calls to ``increment()`` or ``decrement()``.
   Although the value of a ``MutableRealmInteger`` always converges
   across devices, the specific value on which it converges depends on
   the actual order in which operations took place.
   Mixing ``set()`` with ``increment()`` and ``decrement()`` is
   not advised unless fuzzy counting is acceptable. 

.. literalinclude:: /examples/generated/java/local/WritesTest.snippet.counter-set.java
   :language: java
   :copyable: false

Since ``MutableRealmInteger`` instances retain a reference to their
parent object, neither object can be garbage collected while you still
retain a reference to the ``MutableRealmInteger``.
