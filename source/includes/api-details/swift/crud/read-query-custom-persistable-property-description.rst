Queries on SDK Objects
``````````````````````

When working with projected types, queries operate on the persisted type. 
However, you can use the mapped types interchangeably with the persisted 
types in arguments in most cases. The exception is queries on embedded 
objects.

.. tip::

   Projected types support :ref:`sorting and aggregates <sdks-filter-data-swift>`
   where the persisted type supports them.

.. literalinclude:: /examples/generated/code/start/TypeProjection.snippet.query-objects-with-type-projection.swift
   :language: swift

Queries on Embedded Objects
```````````````````````````

You can query embedded types on the supported property types within the 
object using memberwise equality. 

Object link properties support equality comparisons, but do not support 
memberwise comparisons. You can query embedded objects for memberwise
equality on all primitive types. You cannot perform memberwise comparison 
on objects and collections.

Dynamic APIs
````````````

Because the schema has no concept of custom type mappings, reading data via
any of the dynamic APIs gives the underlying persisted type. The SDK does 
support writing mapped types via a dynamic API, and converts the projected
type to the persisted type.

The most common use of the dynamic APIs is migration. You can write projected
types during migration, and the SDK converts the projected type to the persisted
type. However, reading data during a migration gives the underlying persisted
type.
