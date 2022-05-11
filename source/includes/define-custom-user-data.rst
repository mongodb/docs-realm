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
  We recommend that you use the standard ``_id`` field to store the 
  user ID. MongoDB automatically places a constraint on the ``_id`` field, 
  ensuring uniqueness.

  .. note::
      
     If two documents in this collection contain the same user ID value, 
     {+service-short+} uses the first document that matches, which 
     leads to unexpected results.
     
- Save and deploy the changes.
