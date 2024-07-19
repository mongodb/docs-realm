To log out a logged-in user, call the
:kotlin-sync-sdk:`user.logOut() <io.realm.kotlin.mongodb/-user/log-out.html>` 
method.

In the following example, Joe is currently logged-in as the current user. 
After we log Joe out of the app, we confirm that he is still stored on 
the device as a user and that Emma is now the current user: 
