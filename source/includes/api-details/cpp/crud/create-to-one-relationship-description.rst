To create an object with a to-one relationship to another object, 
assign the raw pointer of the related object to the relationship 
property of the main object. Move the object into the database using 
the :cpp-sdk:`Realm.add() function <structrealm_1_1db.html>` 
inside of a write transaction.

In this example, we assign the raw pointer of the related object - 
``FavoriteToy *`` - to the relationship property of the main object
- ``Dog.favoriteToy``. Then, when we add the ``dog`` object to the 
database, this copies both the ``dog`` and ``favoriteToy`` to the database.

The related ``favoriteToy`` object has its own lifecycle independent 
of the main ``dog`` object. If you delete the main object, the related 
object remains.
