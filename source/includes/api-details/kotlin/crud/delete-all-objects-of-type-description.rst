To delete all objects of a specific type from the database at the same time,
pass the object type to ``query()`` and leave the query filter empty to return
all objects of that type.

In the following example, we query for all ``Frog`` objects, and then pass
the results to ``mutableRealm.delete()`` to delete them all from the database:
