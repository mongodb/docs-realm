In Objective-C, to define an embedded object, create a class that inherits from
:objc-sdk:`RLMAsymmetricObject <Classes/RLMAsymmetricObject.html>`.

``RLMAsymmetricObject`` broadly supports the same property types as
``RLMObject``, with a few exceptions:

- Asymmetric objects can only link to embedded objects
   - ``RLMObject`` and ``RLMArray<RLMObject>`` properties are not supported in Swift SDK
     versions 10.42.3 and earlier. In Swift SDK versions 10.42.4 and later,
     asymmetric objects can link to non-embedded objects.
   - ``RLMEmbeddedObject`` and ``RLMArray<RLMEmbeddedObject>`` are supported.

You cannot link to an ``RLMAsymmetricObject`` from within an ``RLMObject``.
Doing so throws an error.
