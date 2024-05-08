To create an object, you must instantiate it using the ``realm`` namespace. 
Move the object into the realm using the
:cpp-sdk:`Realm.add() function <structrealm_1_1db.html>` 
inside of a write transaction.

When you move an object into a realm, this consumes the object as an 
rvalue. You must use the managed object for any data access or observation.
In this example, copying the ``dog`` object into the realm consumes 
it as an rvalue. You can return the managed object to continue to work 
with it.
