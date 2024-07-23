To delete a single ``RealmObject`` object, 
query for the object type using a filter 
that returns the specific object that you want to delete.

In the following example, we query for a ``Frog`` object with a specific 
primary key, and then pass the returned object to ``mutableRealm.delete()`` to 
delete it from the database:
