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
