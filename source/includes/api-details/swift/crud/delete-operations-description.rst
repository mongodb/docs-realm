You can only delete live objects. If you are working with a frozen object,
such as when passing an object across threads, you can convert the frozen
object to a live object by calling the :swift-sdk:`thaw()
<Extensions/Object.html#/s:So16RealmSwiftObjectC0aB0E4thawABXDSgyF>` method.
You can thaw objects, collections, or database instances.
