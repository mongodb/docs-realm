In Swift, to define an SDK object, create a class that inherits from one
of the SDK object types:

- :swift-sdk:`Object <Extensions/Object.html>`
- :swift-sdk:`EmbeddedObject <Extensions/EmbeddedObject.html>`
- :swift-sdk:`AsymmetricObject <Extensions/AsymmetricObject.html>`

The name of the class becomes the table name in the database. Properties of the
class persist in the database. This makes it as easy to work with persisted
objects as it is to work with regular Swift objects.
