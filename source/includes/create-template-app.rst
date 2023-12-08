You can create a template app using the UI on the Atlas App Services
site, the Realm CLI, or the Admin API. 

If you prefer to follow a video showing you how to create a template 
app using the Atlas UI, see 
`Using Template Apps in the Atlas UI 
<https://learn.mongodb.com/learn/course/using-template-apps-in-the-atlas-ui/learning-byte/learn>`__.

.. tabs-realm-admin-interfaces::
   
   .. tab::
      :tabid: ui

      You can create a template App using the same command as you would
      use to create a blank App. To learn how to create an App Services
      App, see :ref:`Create an App <create-app>` and follow the
      instructions for a template App.

      After you create a template app, the UI includes a
      :guilabel:`Welcome to Your Application` section that offers
      several resources for getting started:

      - Information about what your chosen template app includes.

      - On-screen guides to customize your app.

      - Template app client code that you can download as a ``.zip`` file.

   .. tab::
      :tabid: cli

      You can create a template App using the same command as you would
      use to create a blank App. To learn how to create an App Services
      App, see :ref:`Create an App <create-app>` and follow the
      instructions for a template App.
      
      The command must include the ``--template`` flag with a valid
      template App ID value:

      .. code-block:: shell
         
         {+cli-bin+} apps create \
           --name "<App Name>" \
           --template "<Template App ID>"

   .. tab::
      :tabid: api

      You can create a template App using the same endpoint as you would
      use to create a blank App. To learn how to create an App Services
      App, see :ref:`Create an App <create-app>` and follow the
      instructions for a template App.

      Your Admin API request must include a valid ``template_id`` value
      in the request body.

      .. code-block:: bash
         :emphasize-lines: 6

         curl -X POST \
           https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps \
           -H 'Authorization: Bearer <access_token>' \
           -d '{
             "name": "<App Name>",
             "template_id": "<Template App ID>",
             "data_source": {
               "name": "mongodb-atlas",
               "type": "mongodb-atlas",
               "config": {
                 "clusterName": "<Atlas Cluster Name>"
               }
             }
           }'