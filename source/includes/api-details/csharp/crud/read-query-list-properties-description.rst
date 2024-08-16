SDK lists implement the :dotnet-sdk:`IRealmCollection\<T\>
<reference/Realms.IRealmCollection-1.html>` interface, which provides a range
of properties and methods to simplify reading and querying from the list.
You can query an SDK list using the same :ref:`query engines and operators
<sdks-read-query-objects>` as a results set.

The SDK also provides a convenience method to cast an ``IList<T>`` to an
``IRealmCollection<T>``. To convert a list to an SDK collection, call the
:dotnet-sdk:`AsRealmCollection\<T\>
<reference/Realms.CollectionExtensions.html#Realms_CollectionExtensions_AsRealmCollection__1_System_Collections_Generic_IList___0__>`
method with the ``IList<T>`` as its argument.
