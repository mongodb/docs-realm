You can actively remove a user, and all information about that user, from
a device using 
:kotlin-sync-sdk:`user.remove() <io.realm.kotlin.mongodb/-user/remove.html>`. 

In the following example, Emma is the current (and only) logged-in user 
on the device. After we remove her, we confirm that Emma is removed from the 
device and that there is no current user, as Joe is still logged out:
