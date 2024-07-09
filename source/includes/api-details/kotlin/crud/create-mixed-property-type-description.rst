To create a new object instance with a polymorphic 
:kotlin-sdk:`RealmAny <io.realm.kotlin.types/-realm-any/index.html>`  
property, instantiate an object and pass an initial value of a 
supported type to the ``RealmAny`` property using 
:kotlin-sdk:`RealmAny.create() <io.realm.kotlin.types/-realm-any/-companion/create.html>`. 

After you create the object, you *must* know the stored value type 
to work with the ``RealmAny`` property.

In the following example, we instantiate a new ``Frog`` object with a 
``favoriteThings`` list of ``RealmAny`` type and pass the initial values to 
``RealmAny.create()``:
