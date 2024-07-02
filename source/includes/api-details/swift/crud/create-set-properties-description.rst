You can create objects that contain :swift-sdk:`MutableSet 
<Classes/MutableSet.html>` properties as you would any SDK object, but you
can only mutate a ``MutableSet`` within a write transaction. This means you can
only set the value(s) of a set property within a write transaction.
