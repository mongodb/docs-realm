You can remove 
:kotlin-sdk:`RealmDictionary <io.realm.kotlin.types/-realm-dictionary/index.html>`
entries in a few ways:

- To remove the value but keep the key, set the key to ``null`` (the 
  dictionary's value must be nullable)
- To remove the key and the value, pass the key to 
  :kotlin-sdk:`remove() <io.realm.kotlin.types/-realm-dictionary/index.html#-2016920067%2FFunctions%2F878332154>` 

You can also remove *all* keys and values by calling 
:kotlin-sdk:`clear() <io.realm.kotlin.types/-realm-dictionary/index.html#1264776610%2FFunctions%2F878332154>`.

In the following example, we have a ``Frog`` object with a dictionary of 
``String`` values. We remove the dictionary elements in a series of operations 
until the dictionary is empty:
