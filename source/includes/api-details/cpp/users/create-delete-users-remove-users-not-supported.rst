The C++ SDK does not have the ability to remove users through the SDK. 
Instead, you could :ref:`log out the user <sdks-logout>`, and then manually
delete the user's synced database and cached app files from the filesystem.
