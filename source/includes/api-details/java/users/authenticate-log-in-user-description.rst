To authenticate and log users in to your :java-sdk:`App 
<io/realm/mongodb/App.html>`, first instantiate a 
:java-sdk:`Credentials <io/realm/mongodb/Credentials.html>` object containing
the credentials associated with the authentication provider. 
Then, pass it to :java-sdk:`App.login()
<io/realm/mongodb/App.html#login(io.realm.mongodb.Credentials)>` or 
:java-sdk:`App.loginAsync() <io/realm/mongodb/App.html#loginAsync(io.realm.mongodb.Credentials,io.realm.mongodb.App.Callback)>`.

While the ``app.login()`` method blocks
code execution in the calling thread until the supplied credentials have
either succeeded or failed to authenticate a user, the
``app.loginAsync()`` method allows execution to continue, handling
success or failure with a callback function that is guaranteed to
execute on the same thread that called ``app.loginAsync()``.

Each authentication provider corresponds to a :java-sdk:`static helper method
<io/realm/mongodb/Credentials.html>` used to instantiate ``Credentials``
objects for that authentication provider.

If successful, ``App.login()`` returns a :java-sdk:`User <io/realm/mongodb/User.html>`
object. In the event of a failure, ``App.login()`` throws an
exception of type :java-sdk:`AppException <io/realm/mongodb/AppException.html>`. 

Pass a callback to the ``App.loginAsync()`` method to handle success or
failure. This callback accepts a single parameter of type
``App.Result``. The ``isSuccess()`` method of the ``App.Result`` object
passed to the callback returns a boolean that indicates whether the
operation succeeded. In the event of a failure,  you can view the
error that caused the failure using the ``getError()`` method.

.. tip:: 

   You can get the authentication provider type used to log in a user 
   through the :java-sdk:`UserIdentity.getProvider() 
   <io/realm/mongodb/UserIdentity.html>` method. If the user is currently
   logged out, the most recent provider used to log in the user is returned.
