You can only delete live objects. If you are working with a frozen object,
such as when passing an object across threads, you must query for the frozen
object on the new thread in order to delete it.
