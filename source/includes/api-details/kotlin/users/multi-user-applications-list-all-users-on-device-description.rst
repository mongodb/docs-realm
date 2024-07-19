You can access a map of all known user accounts that are stored on 
the device using the 
:kotlin-sync-sdk:`app.allUsers() <io.realm.kotlin.mongodb/-app/all-users.html>`
method. This method returns all users that have logged in to the
client app on a given device regardless of whether they are currently
authenticated (the ``user.state`` is ``LOGGED_IN`` or ``LOGGED_OUT``).

In the following example, the SDK returns both Emma and Joe's 
:kotlin-sync-sdk:`user.id <io.realm.kotlin.mongodb/-user/id.html>`:
