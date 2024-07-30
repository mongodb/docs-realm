In this example, we use an Atlas Function to create the custom user data. The
Function takes an object passed by the client add adds it to the custom user
data collection in Atlas. The Function creates the custom user data if it
doesn't already exist and replaces all data in it if it does exist.

.. literalinclude:: /examples/generated/cpp/updateCustomUserData.snippet.update-custom-user-data.js
   :language: js
   :caption: updateCustomUserData.js - Atlas Function running on server (JavaScript)

The following example :ref:`calls a function <sdks-call-function>` to 
insert a document containing the user ID of the currently logged in user 
and a ``favoriteColor`` value into the custom user data collection.
