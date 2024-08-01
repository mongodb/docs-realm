Within an update block, you can remove remove all unnamed subscriptions of a
class by passing the class name as a string to the
:dotnet-sdk:`RemoveAll("ClassName")
<reference/Realms.Sync.SubscriptionSet.html#Realms_Sync_SubscriptionSet_RemoveAll_System_String_System_Boolean_>`
method. The ``RemoveAll()`` method has an optional second argument that is a
boolean, ``removedName``, which also removes the named subscriptions if it is
set to ``true``. ``removedName`` is set to false by default.

Alternatively, you can remove all unnamed subscriptions of an object type
with :dotnet-sdk:`RemoveAll()
<reference/Realms.Sync.SubscriptionSet.html#Realms_Sync_SubscriptionSet_RemoveAll__1_System_Boolean_>`.
The ``RemoveAll<Type>()`` method has an optional boolean ``removedName`` argument 
that also removes the named subscriptions if it is set to ``true``. The ``removedName`` 
argument is set to false by default.
