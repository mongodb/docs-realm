For our example app, we write a new ``List`` and ``Item`` object, 
then copy them to the synced database.

The objects successfully write to the device, then sync to Atlas because: 

- Both objects are within the parameters of the subscription query 
  (the ``List`` is owned by the user and the ``Item`` is incomplete). 
- The current user has permission to write data to the backend (the role allows 
  authorized users to read and write all data).
