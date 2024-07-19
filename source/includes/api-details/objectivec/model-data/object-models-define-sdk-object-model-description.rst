In Objective-C, to define an SDK object, create a class that inherits from one
of the SDK object types:

- :objc-sdk:`RLMObject <Classes/RLMObject.html>`
- :objc-sdk:`RLMEmbeddedObject <Classes/RLMEmbeddedObject.html>`
- :objc-sdk:`RLMAsymmetricObject <Classes/RLMAsymmetricObject.html>`

The name of the class becomes the table name in the database. Properties of the
class persist in the database. This makes it as easy to work with persisted
objects as it is to work with regular Objective-C objects.
