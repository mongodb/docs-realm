To create a new object instance with a 
:kotlin-sdk:`RealmList <io.realm.kotlin.types/-realm-list/index.html>` 
property, instantiate an object and pass any values of a 
supported type to the ``RealmList`` property.

You can instantiate an unmanaged list with :kotlin-sdk:`realmListOf() <io.realm.kotlin.ext/realm-list-of.html>` 
or pass elements to the list using
:kotlin-sdk:`list.add() <io.realm.kotlin.types/-realm-list/index.html#882550416%2FFunctions%2F878332154>`, 
:kotlin-sdk:`list.addAll() <io.realm.kotlin.types/-realm-list/index.html#-4875109%2FFunctions%2F878332154>`,
or :kotlin-sdk:`list.set() <io.realm.kotlin.types/-realm-list/set.html>`.
The list is unmanaged until you copy it to the database.

In the following example, we instantiate a new ``Frog`` object with 
initial values for several ``RealmList`` properties:
