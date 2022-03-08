Use your MongoDB Cloud API key pair to call the authentication endpoint:

.. code-block:: shell
  
   curl --request POST \
     --header 'Content-Type: application/json' \
     --header 'Accept: application/json' \
     --data '{"username": "<Public API Key>", "apiKey": "<Private API Key>"}' \
     https://realm.mongodb.com/api/admin/v3.0/auth/providers/mongodb-cloud/login

If authentication succeeds, {+backend+} returns an access token as part of
the JSON response document:

.. code-block:: json
   :emphasize-lines: 2

   {
     "access_token": "<access_token>",
     "refresh_token": "<refresh_token>",
     "user_id": "<user_id>",
     "device_id": "<device_id>"
   }

Save the ``access_token``, which you'll use as the Bearer token to authenticate in the upcoming steps.

.. seealso::
  
   :admin-api-endpoint:`API Authentication Documentation <section/Get-Authentication-Tokens>`
