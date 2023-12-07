You can alter or define an object schema through your client application 
code. Model data using language-idiomatic classes and structs with Atlas 
Device SDK. Enable a Device Sync setting to 

Device Sync automatically updates the Atlas schema for your objects
when you make changes to the object models in your client code. 

.. note:: Link a MongoDB Atlas Data Source
   
   Your App must have at least one :ref:`linked data source
   <data-sources>` in order to create a schema.
   
   You cannot use Device Sync with a :ref:`serverless instance
   <serverless-caveats>` or :ref:`{+adf-instance+} <data-federation-caveats>`.

.. procedure::

   .. step:: Model Data in Client Code

      Model data using language-idiomatic classes and structs with Atlas 
      Device SDK.

      Refer to the SDK-specific documentation for information about modeling
      data in the client code.

      - :ref:`C++ SDK <cpp-object-models>`
      - :ref:`Flutter SDK <flutter-define-realm-object-schema>`
      - :ref:`Java SDK <java-define-a-realm-object-schema>`
      - :ref:`Kotlin SDK <kotlin-supported-types>`
      - :ref:`.NET SDK <dotnet-sync-changes-between-devices>`
      - :ref:`Node.js SDK <node-define-a-realm-object-schema>`
      - :ref:`React Native SDK <react-native-define-a-realm-object-schema>`
      - :ref:`Swift SDK <swift-object-models>`

   .. step:: Enable Development Mode Sync

      In your Device Sync configuration, enable Development Mode. For more 
      information about configuring Device Sync, refer to :ref:`enable-realm-sync`.
      
      To enable Development Mode, click the slider to the right of 
      :guilabel:`Development Mode`.

      Enabling Development Mode has some side effects. For more information,
      refer to :ref:`development-mode`.

   .. step:: Open a Synced Database

      When you open a synced database that manages your client object model, 
      and Development Mode is enabled, Device Sync automatically creates or 
      updates the Atlas schema to match the client data model. This lets 
      you make changes in your application code, and automatically update
      the server to reflect your changes.

      .. important:: Update relevant Atlas data

         When you update your client object model, Development Mode can 
         automatically update your Atlas schema to match. But it does not
         update any data that already exists in Atlas to match your new 
         data model. You may need to manually update data in Atlas before
         it can sync with your client application after you make changes to 
         the schema.

         For more information about the impact of specific types of schema
         changes, refer to :ref:`synced-schema-overview`.

      .. example::

         A group is developing a social media application. When the group
         first developed their application, a user's birthday was a required
         field of the ``User`` data model. However, due to privacy concerns
         over the amount of user data that is stored, management creates a
         new requirement to make the user's birthday field an optional
         field. Application developers turn on :guilabel:`Development Mode`
         in the App Services UI and then edit their ``User`` model within
         their client code. Then, the changes they make in the client code
         automatically sync back to the server when they open a synced
         database.

         .. code-block:: javascript

           const realmObjectModel = {
             name: 'User',
             properties: {
               _id: 'objectId',
               _partition: 'string',
               name: 'string',
               // developers set optional: true to adhere to the new requirement
               birthday: {type: 'date', optional: true},
             },
             primaryKey: '_id'
           };

           Realm.open({schema: realmObjectModel, sync: {/*...*/}})
             .then(realm => {
               // ... use the realm instance to read and modify data
             })

   .. step:: Disable Development Mode to Enforce Schema

      While :guilabel:`Development Mode` is on, Device Sync doesn't validate
      writes against your data model, allowing you to freely update your client
      object model. When you turn off :guilabel:`Development Mode`, 
      Device Sync starts to enforce data validation for your Atlas cluster 
      based on your updated schema.

      In the :guilabel:`Sync` screen, turn off :guilabel:`Development Mode` by 
      clicking the slider next to :guilabel:`Development Mode`. The UI indicates 
      that Development Mode has been turned off.

      .. note::

        To make future data model updates from your client code, you
        can follow this procedure again.
