To authenticate and log users in to your :swift-sdk:`App 
<Extensions/App.html>`, first instantiate a 
:swift-sdk:`Credentials <Enums/Credentials.html>` 
object containing the credentials associated with the authentication provider. 
Then, pass it to :flutter-sdk:`App.logIn() <realm/App/logIn.html>`. 

Each authentication provider corresponds to a :swift-sdk:`Credentials helper
method <Enums/Credentials.html>` used to instantiate ``Credentials``
objects for that authentication provider.

If successful, ``App.login()`` returns a :swift-sdk:`User 
<Extensions/User.html>` object. In the event of a failure, ``App.login()``
throws an exception of type :swift-sdk:`AppError 
<Typealiases.html#/s:10RealmSwift8AppErrora>`, which is a type alias for the
underlying :objc-sdk:`RLMAppError <Enums/RLMAppError.html>`.

**Async/Await Login**

.. versionadded:: 10.15.0

The async/await version of the :swift-sdk:`App.login <Extensions/App.html#/s:So6RLMAppC10RealmSwiftE5login11credentials7Combine6FutureCySo7RLMUserCs5Error_pGAC11CredentialsO_tF>` 
method asynchronously returns a User or Error.

.. literalinclude:: /examples/generated/code/start/Authenticate.snippet.async-await.swift
   :language: swift

.. include:: /includes/swift-async-await-support.rst
