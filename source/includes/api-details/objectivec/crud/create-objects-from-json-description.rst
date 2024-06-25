The SDK does not directly support JSON, but you can use
:apple:`NSJSONSerialization
<documentation/foundation/jsonserialization/1415493-jsonobject>` to
convert JSON into a value that you can pass to
:objc-sdk:`RLMObject createInRealm(withValue:)
<Classes/RLMObject.html#/c:objc(cs)RLMObject(cm)createInRealm:withValue:>`.

Nested objects or arrays in the JSON map to to-one or to-many relationships. 

The JSON property names and types must match the destination
:ref:`object model <sdks-object-models>` exactly. For example:

- ``float`` properties must be initialized with float-backed ``NSNumbers``.
- ``Date`` and ``Data`` properties cannot be inferred from strings. Convert
  them to the appropriate type before passing to 
  :objc-sdk:`RLMObject createInRealm(withValue:)
  <Classes/RLMObject.html#/c:objc(cs)RLMObject(cm)createInRealm:withValue:>`.
- Required properties cannot be ``null`` or missing in the JSON.

The SDK ignores any properties in the JSON not defined in the
object schema.

.. tip::

   If your JSON schema doesn't exactly align with your SDK objects,
   consider using a third-party framework to transform your JSON. There
   are many model mapping frameworks that work with the SDK.
   See a :github:`partial list in the realm-swift repository
   <realm/realm-swift/issues/694#issuecomment-144785299>`.
