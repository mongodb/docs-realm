- Log in to the Realm UI, and then click :guilabel:`App Users` in the left 
  hand panel.

- Select the :guilabel:`Custom User Data` tab.

- Set the :guilabel:`Enable Custom User Data` toggle to :guilabel:`On`.

- Specify the following values:

  - :guilabel:`Cluster Name`: The name of a linked MongoDB cluster
    that will contain the custom user data database.
  
  - :guilabel:`Database Name`: The name of the MongoDB database that 
    will contain the custom user data collection.
  
  - :guilabel:`Collection Name`: The name of the MongoDB collection that
    will contain custom user data.

- Specify the User ID field.
  Every document in the custom user data collection must have a field that
  maps to a specific user. The field must be present in every
  document that maps to a user, and must contain the user's ID *as a string*.

  .. note::
      
     If two documents in this collection contain the same user ID, 
     {+service-short+} uses the first matching document to the user.

- Save and deploy the changes.
