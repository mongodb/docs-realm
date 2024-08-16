Consider the following relationship between classes ``Human`` and
``Cat``. This arrangement allows each human to own a single cat:

.. literalinclude:: /examples/generated/java/sync/Human.snippet.complete.java
    :language: java
    :emphasize-lines: 12
    :copyable: false

.. literalinclude:: /examples/generated/java/sync/Cat.snippet.complete.java
    :language: java
    :copyable: false

To query this relationship, use dot notation in a :ref:`query
<sdks-java-filter-data>` to access any property of the linked object.
