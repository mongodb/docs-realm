This example calls an Atlas Function to delete custom user data.
In this example, the Atlas Function does not require any arguments.
The Function uses the function context to determine the caller's user ID, and 
deletes the custom user data document matching the user's ID.

.. literalinclude:: /examples/generated/kotlin/customUserData.snippet.delete-custom-user-data.js
   :language: js
   :caption: deleteCustomUserData.js - Atlas Function running on server (JavaScript)

The SDK code that calls this function requires only a logged-in user to 
call the function.
