App Services manages sessions with access tokens and refresh tokens.
Client SDKs supply the logic to manage tokens and provide them with requests.

Realm *does not* automatically refresh the refresh token. 
When the refresh token expires, the user must log in again.

For more information on managing user sessions and tokens, see :ref:`<user-sessions>`
in the App Services documentation.