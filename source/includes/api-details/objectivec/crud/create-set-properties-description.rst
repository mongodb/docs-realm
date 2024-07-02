You can create objects that contain :objc-sdk:`RLMSet 
<Classes/RLMSet.html>` properties as you would any SDK object, but you
can only mutate an ``RLMSet`` within a write transaction. This means you can
only set the value(s) of a set property within a write transaction.
