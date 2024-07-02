When you create an object with an ``RLMValue``, you must specify the
type of the value you store in the property. The SDK provides an 
:objc-sdk:`RLMValue type <Protocols/RLMValue.html#/c:objc(pl)RLMValue(py)rlm_valueType>`
that you can use to determine what type of value the property has stored.

Later, when you read the mixed property type, you must check the type before
you do anything with the value.
