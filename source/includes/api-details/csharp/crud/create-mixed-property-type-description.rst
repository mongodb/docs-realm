.. note:: 

   You cannot create a nullable ``RealmValue``. However, if you want a
   ``RealmValue`` property to contain a null value, you can 
   use the special ``RealmValue.Null`` property.

The following code demonstrates creating a ``RealmValue`` property in a class 
that inherits from ``IRealmObject`` and then setting and getting the value of 
that property:
