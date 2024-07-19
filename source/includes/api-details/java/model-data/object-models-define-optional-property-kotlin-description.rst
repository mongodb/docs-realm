In Kotlin, fields are considered nullable only if a field is
marked nullable with the Kotlin `? operator
<https://kotlinlang.org/docs/reference/null-safety.html>`__ except
for the following types:

- ``String``
- ``Date``
- ``UUID``
- ``ObjectId``
- ``Decimal128``
- ``RealmAny``

You can require any type that ends with the Kotlin ``?``
operator, such as ``Int?``.

The ``RealmList`` type is non-nullable by default and cannot be
made nullable.
