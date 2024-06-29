In C++, schemas are managed through macros. The schema must list every
property type that you want to persist. The SDK inspects the object model to
determine the property types and other special information, such as whether
a property is the object's primary key.

A schema must accompany every object model you want to persist, and it may be
one of:

- ``REALM_SCHEMA``
- ``REALM_EMBEDDED_SCHEMA``
- ``REALM_ASYMMETRIC_SCHEMA``

You must define the schema and your object model within the ``realm`` namespace.
