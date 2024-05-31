To authenticate and log users in to your :js-sdk:`App 
<classes/Realm.App-1.html>`, first instantiate a 
:js-sdk:`Credentials <classes/Realm.Credentials.html>` object containing the
credentials associated with the authentication provider. 
Then, pass it to :js-sdk:`App.logIn() <classes/Realm.App-1.html#logIn>`. 

Each authentication provider corresponds to a :js-sdk:`Credentials
method <classes/Realm.Credentials.html>` used to instantiate ``Credentials``
objects for that authentication provider.

If successful, ``App.logIn()`` returns a :js-sdk:`User 
<classes/Realm.User.html>` object. In the event of a failure, ``App.logIn()``
throws an exception.

.. tip:: 

   You can get the authentication provider type used to log in a user 
   through the :js-sdk:`UserIdentity.providerType 
   <interfaces/Realm.UserIdentity.html#providerType>`. If the user is
   currently logged out, the most recent provider used to log in the user is
   returned.
