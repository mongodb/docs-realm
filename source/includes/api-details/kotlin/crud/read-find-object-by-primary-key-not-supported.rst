Kotlin does not provide a dedicated API to find an object by its primary key.
Instead, perform a regular query; pass the object type as a type 
parameter and query the primary key field for the desired value.

In the following example, we query a ``Frog`` object and filter by the primary 
key property ``_id``.
