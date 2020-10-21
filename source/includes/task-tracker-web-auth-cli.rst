To enable the email/password authentication provider, paste the following
into ``/auth_providers/local-userpass.json`` in your application
directory.

.. code-block:: json
   
   {
       "name": "local-userpass",
       "type": "local-userpass",
       "config": {
           "autoConfirm": true,
           "resetFunctionName": "resetFunc",
           "runConfirmationFunction": false,
           "runResetFunction": true
       },
       "disabled": false
   }

You'll also need to define the password reset function. Create the
``/functions/resetFunc`` directory and add the following configuration and
source code files to the directory:

.. code-block:: json
   :caption: /functions/resetFunc/config.json

   {
       "name": "resetFunc",
       "private": false,
       "can_evaluate": {}
   }

.. code-block:: javascript
   :caption: /functions/resetFunc/source.js
  
   exports = ({ token, tokenId, username, password }) => {
     // will not reset the password
     return { status: 'fail' };
   };
