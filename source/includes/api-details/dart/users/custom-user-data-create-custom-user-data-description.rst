This example uses an Atlas Function to create the custom user data document.
The Atlas Function takes an object passed by the client add adds
it to the custom user data collection in Atlas. The Function creates
the custom user data if it doesn't already exist and replaces all data in it
if it does exist.

.. literalinclude:: /examples/generated/flutter/writeCustomUserData.snippet.write-custom-user-data.js
   :language: js
   :caption: writeCustomUserData.js - Atlas Function running on server (JavaScript)

The client calls the Function to create the user data.
