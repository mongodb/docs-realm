To authenticate and log users in to your :flutter-sdk:`App 
<realm/App-class.html>`, first instantiate a 
:flutter-sdk:`Credentials <realm/Credentials-class.html>` 
object containing the credentials associated with the authentication provider. 
Then, pass it to :flutter-sdk:`App.logIn() <realm/App/logIn.html>`. 

Each authentication provider corresponds to a :flutter-sdk:`Credentials
constructor <realm/Credentials-class.html>` used to instantiate ``Credentials``
objects for that authentication provider.

If successful, ``App.logIn()`` returns a :flutter-sdk:`User 
<realm/User-class.html>` object. In the event of a failure, ``App.logIn()``
throws an exception of type :flutter-sdk:`AppException 
<realm/AppException-class.html>`. 

.. tip:: 

   You can get the authentication provider type used to log in a user 
   through the :flutter-sdk:`UserIdentity.provider 
   <realm/UserIdentity-class.html>` property. If the user is currently logged
   out, the most recent provider used to log in the user is returned.
