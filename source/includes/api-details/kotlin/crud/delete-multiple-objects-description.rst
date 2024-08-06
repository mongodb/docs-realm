To delete multiple objects at the same time, pass the object type to 
``query()`` and specify a query that returns all objects that you want 
to delete.

In the following example, we query for the first three ``Frog`` objects whose 
``species`` is "bullfrog", and then pass the results to 
``mutableRealm.delete()`` to delete them from the database:
