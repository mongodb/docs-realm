In Objective-C, pointer-type properties are considered optional in the
data model unless you specifically declare a property as required.
To declare a given property as required, implement the
:objc-sdk:`requiredProperties
<Classes/RLMObject.html#/c:objc(cs)RLMObject(cm)requiredProperties>`
method and return an array of required property names.

Implicitly required properties, such as properties of primitive types, do
not need to be manually included in the ``requiredProperties`` array.
