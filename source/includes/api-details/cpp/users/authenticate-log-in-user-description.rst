To authenticate and log users in to your :cpp-sdk:`App 
<classrealm_1_1App.html>`, first instantiate a 
:cpp-sdk:`credentials <structrealm_1_1App_1_1credentials.html>` 
object containing the credentials associated with the authentication provider. 
Then, pass it to the ``login()`` function. 

Each authentication provider corresponds to a :cpp-sdk:`static function
<structrealm_1_1App_1_1credentials.html>`
used to instantiate ``credentials`` objects for that authentication provider.

If successful, ``app::login()`` returns a :cpp-sdk:`user 
<structrealm_1_1user.html>` object. In the event of a failure, 
``app::login()`` throws an exception of type :cpp-sdk:`app_error 
<structrealm_1_1app__error.html>`.
