/*
Aggregate operators do not support dot-notation, so you
cannot directly operate on a property of all of the objects
in a collection property.

You can operate on a numeric property of the top-level
object, however:
*/
Log.i(TAG, "Tasks average priority: " + tasksQuery.average("priority"));
