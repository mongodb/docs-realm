You can link identities using the 
:dotnet-sdk:`LinkCredentialsAsync() <reference/Realms.Sync.User.html#Realms_Sync_User_LinkCredentialsAsync_Realms_Sync_Credentials_>`. 
This links the identity belonging to the credentials to the logged-in 
:dotnet-sdk:`User <reference/Realms.Sync.User.html>` object. 

.. literalinclude:: /examples/generated/dotnet/UserLinkExamples.snippet.link.cs
   :language: csharp

In the example above, we must first register the new :ref:`email/password
<email-password-authentication>` user before linking. If you are using any of
the other :ref:`Auth Providers <authentication-providers>`, this step is
unnecessary. The following example uses :ref:`Google authentication
<google-authentication>` instead of EmailPassword.
