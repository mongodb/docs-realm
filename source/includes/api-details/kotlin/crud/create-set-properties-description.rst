To create a new object instance with a 
:kotlin-sdk:`RealmSet <io.realm.kotlin.types/-realm-set/index.html>`
property, instantiate an object and pass any values of a 
supported type to the ``RealmSet`` property.

You can instantiate an unmanaged set with 
:kotlin-sdk:`realmSetOf() <io.realm.kotlin.ext/realm-list-of.html>`
or pass elements to the set using 
:kotlin-sdk:`set.add() <io.realm.kotlin.types/-realm-set/index.html#-153241610%2FFunctions%2F878332154>`
or  
:kotlin-sdk:`set.addAll() <io.realm.kotlin.types/-realm-set/index.html#-800009087%2FFunctions%2F878332154>`. 
The set is unmanaged until you copy it to the database.

In the following example, we instantiate a new ``Frog`` object with
initial values for ``favoriteSnacks`` and ``favoriteWeather`` set 
properties:
