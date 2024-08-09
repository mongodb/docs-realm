This example calls an Atlas Function to create custom user data. In this
example, the Atlas Function takes an object passed by the client and 
adds it to the custom user data collection in Atlas. 
The Function creates the custom user data if it doesn't already exist and 
replaces all data in it if it does exist.

.. literalinclude:: /examples/generated/kotlin/customUserData.snippet.write-custom-user-data.js
   :language: js
   :caption: writeCustomUserData.js - Atlas Function running on server (JavaScript)

The Kotlin SDK uses the following code to call this Function.
