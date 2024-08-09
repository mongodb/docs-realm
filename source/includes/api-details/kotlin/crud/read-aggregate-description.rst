You can perform aggregation using
:ref:`RQL aggregate operators <rql-aggregate-operators>`, one of the 
following convenience methods, or a combination of both:

- :kotlin-sdk:`max() <io.realm.kotlin.query/-realm-query/max.html>`
- :kotlin-sdk:`min() <io.realm.kotlin.query/-realm-query/min.html>`
- :kotlin-sdk:`sum() <io.realm.kotlin.query/-realm-query/sum.html>`
- :kotlin-sdk:`count() <io.realm.kotlin.query/-realm-query/count.html>`

In the following example, we aggregate the ``age`` property of a ``Frog`` 
object type.
