You can only delete live objects. If you are working with a frozen object,
such as when passing an object across threads, you can convert the frozen
object to a live object by calling the :objc-sdk:`thaw
<Classes/RLMObject.html#/c:objc(cs)RLMObject(im)thaw>` method. You can thaw
objects, collections, or database instances.

Similarly, if you're passing an :objc-sdk:`RLMThreadSafeReference
<Classes/RLMThreadSafeReference.html>` for an object you want to delete, you
must resolve the reference and then delete the resovled object.

For more information about working with objects across threads, refer to
:ref:`sdks-threading`.
