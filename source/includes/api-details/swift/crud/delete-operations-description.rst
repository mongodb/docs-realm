You can only delete live objects. If you are working with a frozen object,
such as when passing an object across threads, you can convert the frozen
object to a live object by calling the :swift-sdk:`thaw()
<Extensions/Object.html#/s:So16RealmSwiftObjectC0aB0E4thawABXDSgyF>` method.
You can thaw objects, collections, or database instances.

Similarly, if you're passing a :swift-sdk:`ThreadSafeReference
<Structs/ThreadSafeReference.html>` for an object you want to delete, you must
resolve the reference within the write transaction and then delete the resovled
object.

For more information about working with objects across threads, refer to
ref:`sdks-threading`.
