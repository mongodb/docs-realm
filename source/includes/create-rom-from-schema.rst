.. note:: Link a MongoDB Atlas Data Source
   
   Your app must have at least one :ref:`linked data source
   <data-sources>` in order to define an App Services data model.
   
   You cannot use sync with a :ref:`serverless instance
   <serverless-caveats>` or :ref:`{+adf-instance+} <data-federation-caveats>`.

.. procedure::

   .. step:: Define an App Services Schema

      .. include:: /includes/define-app-services-schema.rst

   .. step:: View the Realm Object Schema

      The Realm Object Schema defines and validates your data in your mobile
      client application. To view your Realm Object Schema:
      
      #. Navigate to the :guilabel:`Atlas Device SDK` page.
      #. Click the :guilabel:`Realm Object Models` tab. 
      #. Select your preferred language or framework from the drop-down menu.
      
      From here, you can click the :icon-lg:`Copy` icon to copy an individual
      client object model. Or you can press the 
      :guilabel:`Copy All Data Models` button to copy every model for all of
      the schemas in your App Services App.
   
   .. step:: Add the client models to your client application

      Open your client application code in your IDE and paste the client 
      object model code into your app.
