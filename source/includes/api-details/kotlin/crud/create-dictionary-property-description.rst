To create a new object instance with a 
:kotlin-sdk:`RealmDictionary <io.realm.kotlin.types/-realm-dictionary/index.html>` 
property, instantiate an object and pass any key-value pairs of a 
supported type to the ``RealmDictionary`` property. 

You can instantiate an unmanaged dictionary with 
:kotlin-sdk:`realmDictionaryOf() <io.realm.kotlin.ext/realm-dictionary-of.html>` 
or 
:kotlin-sdk:`realmDictionaryEntryOf() <io.realm.kotlin.ext/realm-dictionary-entry-of.html>`.
Or you can pass key-values using 
:kotlin-sdk:`put() <io.realm.kotlin.types/-realm-dictionary/index.html#1052690691%2FFunctions%2F878332154>`
or 
:kotlin-sdk:`putAll() <io.realm.kotlin.types/-realm-dictionary/index.html#-704210467%2FFunctions%2F878332154>`. 
The dictionary is unmanaged until you copy it to the database.

.. include:: /includes/map-key-string-limitations.rst

.. literalinclude:: /examples/generated/kotlin/CreateTest.snippet.percent-encode-disallowed-characters.kt
   :language: kotlin

In the following example, we instantiate a new ``Frog`` object with
initial key-values for several dictionary properties:
