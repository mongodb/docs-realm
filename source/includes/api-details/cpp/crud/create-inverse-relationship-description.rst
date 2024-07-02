To create an object with a inverse relationship to another object, 
assign the raw pointer of the related object to the relationship 
property of the main object. Move the object into the realm using the 
:cpp-sdk:`Realm.add() function <structrealm_1_1db.html>` 
inside of a write transaction.

In this example, we create two ``Person`` objects that each have a to-one 
relationship to the same ``Dog`` object. The ``Dog`` has an inverse 
relationship to each ``Person`` object. The inverse relationship backlink 
is automatically updated when a linked ``Person`` object updates its 
``Dog`` relationship.
