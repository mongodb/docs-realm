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

   * - String Operators
     - ``in``

   * - Aggregate Operators
     - ``@avg``, ``@count``, ``@max``, ``@min``, ``@sum``

   * - Query Suffixes
     - ``DISTINCT``, ``SORT``, ``LIMIT``

Case insensitive queries (``[c]``) cannot use indexes effectively.
As a result, case insensitive queries are not recommended, since they could lead to
performance problems.

Flexible Sync only supports ``@count`` for array fields.

Embedded or Linked Objects
~~~~~~~~~~~~~~~~~~~~~~~~~~

Flexible Sync does not support querying on properties in Embedded Objects 
or links. For example, ``obj1.field = “foo”``.
