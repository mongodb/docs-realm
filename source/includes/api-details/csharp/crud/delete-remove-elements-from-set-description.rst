You can remove one or more elements from a set within a write transaction.

Deleting an object from the database will remove it from any sets 
in which it existed. Therefore, a set of objects will never contain null objects.
However, sets of primitive types can contain null values. If you do not 
want to allow null values in a set, then either use non-nullable types in 
the set declaration (for example, use ``ISet<double>`` instead of 
``ISet<double?>``). If you are using the older schema 
type definition (your classes derive from the ``RealmObject`` base class),
or you do not have nullability enabled, you will need to use the
``[Required]`` attribute if the set contains nullable reference types, such as
``string`` or ``byte[]``. 

.. important:: Not Supported with Sync

   Non-synced databases support collections of nullable (optional) values, 
   but synced databases do not.
