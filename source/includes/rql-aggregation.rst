Aggregate Operators
```````````````````

You can apply an aggregate operator to a collection property of a Realm
object. Aggregate operators traverse a collection and reduce it to a
single value.

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Operator
     - Description

   * - | ``@avg``
     - Evaluates to the average value of a given numerical property across a collection.
       If any values are ``null``, they are not counted in the result.

   * - | ``@count``
     - Evaluates to the number of objects in the given collection.

   * - | ``@max``
     - Evaluates to the highest value of a given numerical property across a collection.
       ``null`` values are ignored.

   * - | ``@min``
     - Evaluates to the lowest value of a given numerical property across a collection.
       ``null`` values are ignored.

   * - | ``@sum``
     - Evaluates to the sum of a given numerical property across a collection,
       excluding ``null`` values.

.. example::

   These examples all query for projects containing tasks that meet 
   this criteria:

   - Projects with average task priority above 5.
   - Projects with a task whose priority is less than 5.
   - Projects with a task whose priority is greater than 5.
   - Projects with more than 5 tasks.
   - Projects with long-running tasks.

   .. literalinclude:: /examples/generated/realm-query-language/realm-query-language.codeblock.aggregate-operators.js
      :language: javascript

Collection Operators
````````````````````

A **collection operator** uses specific rules to determine whether
to pass each input collection object to the output
collection by applying a given predicate to every element of
a given list property of
the object.

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Operator
     - Description

   * - ``ALL``
     - Returns objects where the predicate evaluates to ``true`` for all objects in the collection.

   * - ``ANY``, ``SOME``
     - Returns objects where the predicate evaluates to ``true`` for any objects in the collection.

   * - ``NONE``
     - Returns objects where the predicate evaluates to false for all objects in the collection.


.. example::

   We use the query engine's collection operators to find:

   - Projects with no complete tasks.
   - Projects with any top priority tasks.

   .. literalinclude:: /examples/generated/realm-query-language/realm-query-language.codeblock.set-operators.js
      :language: javascript

Sort, Distinct, Limit
`````````````````````

You can use additional operators in your queries to sort and limit the 
results collection.

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Operator
     - Description

   * - ``SORT``
     - Specify the name of the property to compare. You can optionally 
       specify ascending (``ASC``) or descending (``DESC``) order.
       If you specify multiple SORT fields, the query sorts by the first
       field, and then the second. For example, if you ``SORT (priority, name)``, 
       the query returns sorted by priority, and then by name when priority
       value is the same.

   * - ``DISTINCT``
     - Specify a name of the property to compare. Remove duplicates 
       for that property in the results collection. If you specify multiple 
       DISTINCT fields, the query removes duplicates by the first field, and 
       then the second. For example, if you ``DISTINCT (name, assignee)``, 
       the query only removes duplicates where the values of both properties
       are the same.

   * - ``LIMIT``
     - Limit the results collection to the specified number.

.. example::

   We use the query engine's sort, distinct, and limit operators to find: 
   
   - Tasks where the assignee is Ali

     - Sorted by priority in descending order
     - Enforcing uniqueness by name
     - Limiting the results to 5 tasks

   .. literalinclude:: /examples/generated/realm-query-language/realm-query-language.codeblock.sort-distinct-limit.js
      :language: javascript