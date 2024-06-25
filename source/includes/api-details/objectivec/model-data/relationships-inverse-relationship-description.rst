To define an inverse relationship, use
:objc-sdk:`RLMLinkingObjects
<Classes.html#/c:objc(cs)RLMLinkingObjects>` in your object model.
Override :objc-sdk:`+[RLMObject linkingObjectProperties]
<Classes/RLMObject.html#/c:objc(cs)RLMObject(cm)linkingObjectsProperties>`
method in your class to specify the object type and property name
of the relationship that it inverts.
