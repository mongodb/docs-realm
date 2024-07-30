You can only delete live objects. If you are working with a frozen object,
such as when passing an object across threads, you must query for the frozen
object on the new thread in order to delete it.

Similarly, if you're passing a :dotnet-sdk:`ThreadSafeReference
<reference/Realms.ThreadSafeReference.html>` for an object you want to delete,
you must resolve the reference and then delete the resovled object.

For more information about working with objects across threads, refer to
:ref:`sdks-threading`.
