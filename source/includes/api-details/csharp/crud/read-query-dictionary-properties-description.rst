You can query and iterate through a :ref:`RealmDictionary <sdks-dictionary-property-types>` 
property as you would an
`IDictionary <https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.idictionary-2?view=net-8.0>`__.

The SDK also provides a convenience method to cast an ``IDictionary<T>`` to an
``IRealmCollection<T>``. To convert a dictionary to an SDK collection, call the
:dotnet-sdk:`AsRealmCollection\<T\>
<reference/Realms.CollectionExtensions.html#Realms_CollectionExtensions_AsRealmCollection__1_System_Collections_Generic_IDictionary_System_String___0__>`
method with the ``IDictionary<T>`` as its argument.
