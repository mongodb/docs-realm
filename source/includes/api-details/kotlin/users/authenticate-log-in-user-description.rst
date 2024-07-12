To authenticate and log users in to your :kotlin-sync-sdk:`App 
<io.realm.kotlin.mongodb/-app/index.html>`, first instantiate a 
:kotlin-sync-sdk:`Credentials <io.realm.kotlin.mongodb/-credentials/index.html>` 
object containing the credentials associated with the authentication provider. 
Then, pass it to :kotlin-sync-sdk:`app.login()
<io.realm.kotlin.mongodb/-app/login.html>`. 

Each authentication provider corresponds to a :kotlin-sync-sdk:`static helper method
<io.realm.kotlin.mongodb/-authentication-provider/index.html>`
used to instantiate ``Credentials`` objects for that authentication provider.

If successful, ``app.login()`` returns a :kotlin-sync-sdk:`User
<io.realm.kotlin.mongodb/-user/index.html>` object. In the event of a failure,
``app.login()`` throws one of three exception types, depending on the error:

- :kotlin-sync-sdk:`AuthException
  <io.realm.kotlin.mongodb.exceptions/-auth-exception/index.html>`: the
  top-level or "catch-all" for problems related to user account actions. Prefer
  catching sub-types for granular error handling.
- :kotlin-sync-sdk:`InvalidCredentialsException
  <io.realm.kotlin.mongodb.exceptions/-invalid-credentials-exception/index.html>`:
  the provided credentials were not correct. Only email/password, API Key,
  and JWT providers can throw this exception. Other providers throw
  ``AuthException``.
- :kotlin-sync-sdk:`ServiceException
  <io.realm.kotlin.mongodb.exceptions/-service-exception/index.html>`: the
  top-level or "catch-all" for problems related to HTTP requests made to
  App Services. This covers HTTP transport problems, problems passing JSON, or
  the server considering the request invalid. Prefer catching sub-types for
  more granular error handling.

.. tip:: 

   You can get the authentication provider type used to log in a user 
   through the :kotlin-sync-sdk:`UserIdentity.provider 
   <io.realm.kotlin.mongodb/-user-identity/provider.html>` property. If the
   user is currently logged out, the most recent provider used to log in the
   user is returned.
