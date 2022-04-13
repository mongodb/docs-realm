.. warning:: Recovering Unsynchronized Changes after Terminating Sync
 
 Terminating and re-enabling {+sync+} prevents unsynchronized client changes
 from automatically syncing. To recover any unsynchronized changes, implement a
 manual client reset that handles this case in your client applications:

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