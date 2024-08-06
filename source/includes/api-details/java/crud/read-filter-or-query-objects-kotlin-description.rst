In Java or Kotlin (Java SDK), you can filter objects with either the
Fluent interface or RQL.

Filter Data with Fluent Interface
`````````````````````````````````

To filter data with the Fluent interface, filter data with a
:java-sdk:`RealmQuery <io/realm/RealmQuery.html>`. For more details, refer
to :ref:`Fluent interface <sdks-java-filter-data>`.

In the following example, we use the Fluent interface comparison operators to:

- Find high priority tasks by comparing the value of the ``priority`` property value with a threshold number, above which priority can be considered high.
- Find just-started or short-running tasks by seeing if the ``progressMinutes`` property falls within a certain range.
- Find unassigned tasks by finding tasks where the ``assignee`` property is equal to null.
- Find tasks assigned to specific teammates Ali or Jamie by seeing if the ``assignee`` property is in a list of names.

.. literalinclude:: /examples/generated/java/sync/ReadsTest.snippet.filter-results.kt
   :language: kotlin
   :copyable: false

Filter Data with RQL
````````````````````

To filter data with RQL, use :java-sdk:`RealmQuery.rawPredicate()
<io/realm/RealmQuery.html#rawPredicate-java.lang.String->`.
For more information about syntax, usage and limitations,
refer to the :ref:`Realm Query Language reference <realm-query-language>`.

RQL can use either the class and property names defined in your SDK model
classes or the internal names defined with ``@RealmField``. You can combine
raw predicates with other raw predicates or type-safe predicates created with
``RealmQuery``.
