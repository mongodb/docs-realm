You can read the user metadata of a currently logged-in user through 
that user's 
:kotlin-sync-sdk:`User <io.realm.kotlin.mongodb/-user/index.html>` 
object. You cannot edit user metadata through a ``User`` object. 

To read the data, call the :kotlin-sync-sdk:`profileAsBsonDocument
<io.realm.kotlin.mongodb.ext/profile-as-bson-document.html>`
method on the ``User`` object of a logged-in user.
