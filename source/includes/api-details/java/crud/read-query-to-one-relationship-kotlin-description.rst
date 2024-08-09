Consider the following relationship between classes ``Person`` and
``Dog``. This arrangement allows each person to own a single dog:

.. literalinclude:: /examples/generated/java/sync/Person.snippet.complete.kt
    :language: kotlin
    :emphasize-lines: 10
    :copyable: false

.. literalinclude:: /examples/generated/java/sync/Dog.snippet.complete.kt
    :language: kotlin
    :copyable: false

To query this relationship, use dot notation in a :ref:`query
<sdks-java-filter-data>` to access any propertyof the linked object:
