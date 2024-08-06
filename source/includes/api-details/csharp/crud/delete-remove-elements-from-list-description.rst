You can remove one or more elements from a list within a write transaction.

Deleting an object from the database will remove it from any lists 
where it existed. Therefore, a list of objects will never contain deleted objects.
However, lists of primitive types can contain null values. If you do not 
want to allow null values in a list, then either use non-nullable types in 
the list declaration (for example, use ``IList<double>`` instead of 
``IList<double?>``). If you are using the older schema 
type definition (your classes derive from the ``RealmObject`` base class),
or you do not have nullability enabled, use the ``[Required]`` attribute if
the list contains nullable reference types, such as ``string`` or ``byte[]``.

.. important:: Not Supported with Sync

   Non-synced databases support collections of nullable (optional) values, 
   but synced databases do not.
