Flexible Sync has some limitations when using RQL operators. When you 
write the :ref:`query subscription <flexible-sync-query-subscription>` 
that determines which data to sync, the server does not support these
query operators. However, you can still use the full range of RQL features
to query the synced data set in the client application.

Unsupported Query Operators in Flexible Sync
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - Operator Type
     - Unsupported Operators

   * - Aggregate Operators
     - ``@avg``, ``@count``, ``@max``, ``@min``, ``@sum``

   * - Query Suffixes
     - ``DISTINCT``, ``SORT``, ``LIMIT``

Case insensitive queries (``[c]``) cannot use indexes effectively.
As a result, case insensitive queries are not recommended, since they could lead to
performance problems.

Flexible Sync only supports ``@count`` for array fields.

List Queries
~~~~~~~~~~~~

Flexible Sync supports querying lists using the ``IN`` operator.

You can query a list of constants to see if it contains the value of a
queryable field:

.. code-block:: javascript
   
   // Query a constant list for a queryable field value
   "priority IN { 1, 2, 3 }"

If a queryable field has an array value, you can query to see if it
contains a constant value:

.. code-block:: javascript
   
   // Query an array-valued queryable field for a constant value
   "'comedy' IN genres"

Embedded or Linked Objects
~~~~~~~~~~~~~~~~~~~~~~~~~~

Flexible Sync does not support querying on properties in Embedded Objects 
or links. For example, ``obj1.field = "foo"``.
