.. warning:: Restore Sync after Terminating Sync

 When you terminate and re-enable {+sync+}, clients can no longer Sync. 
 Your client must implement a client reset handler to restore Sync. This 
 handler can discard or attempt to recover unsynchronized changes.

 .. tabs-realm-sdks::

   .. tab::
      :tabid: android

      Learn how to perform a :ref:`Client Reset using the Java SDK <java-client-resets>`.

   .. tab::
      :tabid: ios

      Learn how to perform a :ref:`Client Reset using the Swift SDK <ios-client-resets>`.

   .. tab::
      :tabid: node
      
      Learn how to perform a :ref:`Client Reset using the Node SDK <node-client-resets>`.

   .. tab::
      :tabid: react-native
      
      Learn how to perform a :ref:`Client Reset using the React Native SDK <react-native-client-resets>`.

   .. tab::
      :tabid: dotnet

      Learn how to perform a :ref:`Client Reset using the .NET SDK <dotnet-client-reset>`.