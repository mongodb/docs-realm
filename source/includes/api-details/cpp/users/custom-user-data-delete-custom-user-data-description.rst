In this example, we use an Atlas Function to delete the custom user data
document. The Atlas Function does not require any arguments. The 
Function uses the Function context to determine the caller's user ID, and 
deletes the custom user data document matching the user's ID.

.. literalinclude:: /examples/generated/cpp/deleteCustomUserData.snippet.delete-custom-user-data.js
   :language: js
   :caption: deleteCustomUserData.js - Atlas Function running on server (JavaScript)

The code that calls this Function requires only a logged-in user to call
the Function.
