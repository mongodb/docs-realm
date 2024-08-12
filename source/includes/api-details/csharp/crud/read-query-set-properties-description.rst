SDK sets implement the :dotnet-sdk:`IRealmCollection\<T\>
<reference/Realms.IRealmCollection-1.html>` interface, which provides a range
of properties and methods to simplify reading and querying from the set.
You can query an SDK set using the same :ref:`query engines and operators
<sdks-read-query-objects>` as a results set.

The SDK also provides a convenience method to cast an ``ISet<T>`` to an
``IRealmCollection<T>``. To convert a set to an SDK collection, call the
:dotnet-sdk:`AsRealmCollection\<T\>
<reference/Realms.CollectionExtensions.html#Realms_CollectionExtensions_AsRealmCollection__1_System_Collections_Generic_ISet___0__>`
method with the ``ISet<T>`` as its argument.
