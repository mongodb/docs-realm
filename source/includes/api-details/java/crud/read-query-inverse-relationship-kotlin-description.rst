Consider the following relationship between classes ``Dog`` and
``Person``. In this example, all dogs link to their owner (or
multiple owners, if multiple person objects refer to the same dog).
Realm calculates the owners of each dog for you based on the field
name you provide to the ``@LinkingObjects`` annotation:

.. include:: /examples/generated/java/sync/Dog.snippet.complete.kt.rst

.. include:: /examples/generated/java/sync/Person.snippet.complete.kt.rst

To query this relationship, use dot notation in a
:ref:`query <sdks-java-filter-data>` to access any property
of the linked object.
