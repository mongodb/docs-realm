To create an embedded object, assign the raw pointer of the embedded 
object to a parent object's property. Move the parent object into 
the realm using the :cpp-sdk:`Realm.add() function <structrealm_1_1db.html>` 
inside of a write transaction.

In this example, we assign the raw pointer of the embedded object - 
``ContactDetails *`` - to the embedded object property of the parent 
object - ``Business.contactDetails``.

Then, we add the ``business`` object to the realm. This copies the 
``business`` and ``contactDetails`` objects to the realm. 

Because ``ContactDetails`` is an embedded object, it does not have
its own lifecycle independent of the main ``Business`` object. 
If you delete the ``Business`` object, this also deletes the 
``ContactDetails`` object.
