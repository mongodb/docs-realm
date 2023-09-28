You can create multiple App client instances to connect to multiple
Apps. All App client instances that share the same App ID use the same 
underlying connection.

.. important:: You Can't Change an App Config After Initializing the App

   When you initialize the App client, the configuration is cached internally.
   Attempting to "close" an App and then re-open it with a changed 
   configuration within the same process has no effect. The client 
   continues to use the cached configuration.
