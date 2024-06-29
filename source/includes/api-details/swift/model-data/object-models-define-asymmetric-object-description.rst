In Swift, to define an asymmetric object, create a class that inherits from
:swift-sdk:`AsymmetricObject <Extensions/AsymmetricObject.html>`.

``AsymmetricObject`` broadly supports the same property types as ``Object``,
with a few exceptions:

- Asymmetric objects can only link to embedded objects
   - ``Object`` and ``List<Object>`` properties are not supported in Swift SDK
     versions 10.42.3 and earlier. In Swift SDK versions 10.42.4 and later,
     asymmetric objects can link to non-embedded objects.
   - ``EmbeddedObject`` and ``List<EmbeddedObject>`` are supported.

You cannot link to an ``AsymmetricObject`` from within an ``Object``. Doing so
throws an error.
