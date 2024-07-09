Fields marked with Java object types are nullable by default. All other types
(primitives) are required by default. You can mark a nullable field with the
:java-sdk:`@Required <io/realm/annotations/Required.html>`
annotation to prevent that field from holding a null value.

The following types are nullable:

- ``String``
- ``Date``
- ``UUID``
- ``ObjectId``
- ``Integer``
- ``Long``
- ``Short``
- ``Byte`` or ``byte[]``
- ``Boolean``
- ``Float``
- ``Double``

Primitive types like ``int`` and ``long`` are non-nullable by
default and cannot be made nullable, as they cannot be set to a
null value.
