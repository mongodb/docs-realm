Consider the following relationship between classes ``Cat`` and
``Human``. In this example, all cats link to their human (or
multiple humans, if multiple human objects refer to the same cat).
Realm calculates the owners of each cat for you based on the field
name you provide to the ``@LinkingObjects`` annotation:

.. include:: /examples/generated/java/sync/Cat.snippet.complete.java.rst

.. include:: /examples/generated/java/sync/Human.snippet.complete.java.rst

To query this relationship, use dot notation in a
:ref:`query <sdks-java-filter-data>` to access any property
of the linked object.
