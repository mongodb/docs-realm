.. _example-auth-google-node-server:

.. example:: Authenticate with Google on a Node.js Server

   Refer to `the code for an example Node.js server <https://github.com/mongodb/docs-realm/tree/master/examples/node/legacy/Examples/server_google_auth>`_
   that implements Sign in With Google.
   All of the Google OAuth 2.0 implementation is in the ``server.js`` file.

   The example uses `Express <https://expressjs.com/>`_ for routing and the
   Google Auth Library for Node.js.

   You might want to authenticate with Google on a Node.js server
   to perform server-side operations on behalf of a user, like call an
   Atlas Function with a user's credentials.

Use the official `Google Auth Library for Node.js <https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest>`_
to handle the user authentication and redirect flow from a Node.js client application:

#. Install the Realm and Google APIs npm packages.
   
   .. code-block::

      npm install realm googleapis

#. Import the packages into your project.

   .. literalinclude:: /examples/generated/node/server.snippet.import-npm-packages.js
         :language: javascript

#. Create configuration for Google OAuth 2.0 client and the SDK.

   .. literalinclude:: /examples/generated/node/server.snippet.google-oauth-realm-config.js
         :language: javascript

#. Generate an OAuth login link, and pass it to the application client.

   .. literalinclude:: /examples/generated/node/server.snippet.generate-log-in.js
         :language: javascript

#. Process the request from the the Google authentication server, which includes
   an access code in the query string using the Google OAuth 2.0 client's ``getToken()``
   method. In the callback function, sign in to your App using the ``id_token``.
