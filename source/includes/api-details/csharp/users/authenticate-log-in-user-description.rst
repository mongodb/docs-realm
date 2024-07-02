To authenticate and log users in to your :dotnet-sdk:`App 
<reference/Realms.Sync.App.html>`, first instantiate a 
:dotnet-sdk:`Credentials <reference/Realms.Sync.Credentials.html>` 
object containing the credentials associated with the authentication provider. 
Then, pass it to :dotnet-sdk:`LogInAsync()
<reference/Realms.Sync.App.html#Realms_Sync_App_LogInAsync_Realms_Sync_Credentials_>`. 

Each authentication provider corresponds to a :dotnet-sdk:`factory method
<reference/Realms.Sync.Credentials.html>`
used to instantiate ``Credentials`` objects for that authentication provider.

If successful, ``LogInAsync()`` returns a :dotnet-sdk:`User
<reference/Realms.Sync.User.html>` object. In the event of a failure, 
``LogInAsync()`` throws an exception of type :dotnet-sdk:`AppException 
<reference/Realms.Sync.Exceptions.AppException.html>`. 

.. tip:: 

   You can get the authentication provider type used to log in a user 
   through the :dotnet-sdk:`UserIdentity.Provider 
   <reference/Realms.Sync.UserIdentity.html#Realms_Sync_UserIdentity_Provider>`
   property. If the user is currently logged out, the most recent provider
   used to log in the user is returned.
