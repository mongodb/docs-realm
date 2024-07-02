To create an object with a to-many relationship to one or more objects:

- Initialize the main object and the related objects
- Use the :cpp-sdk:`push_back 
  <structrealm_1_1managed_3_01std_1_1vector_3_01T_01_5_01_4_01_4.html>`
  member function available to the Realm object lists
  to append the raw pointers of the related objects to the main object's 
  list property
- Move the object into the realm using the 
  :cpp-sdk:`Realm.add() function <structrealm_1_1db.html>` 
  inside of a write transaction.

In this example, we append the raw pointers of the related objects - 
``Employee *`` - to the relationship property of the main object
- ``Company.employees``. This creates a one-way connection from the 
``Company`` object to the ``Employee`` objects.

Then, we add the ``Company`` to the realm. This copies the 
``Company`` and ``Employee`` objects to the realm. 

The related ``Employee`` objects have their own lifecycle independent 
of the main ``Company`` object. If you delete the main object, the 
related objects remain.
