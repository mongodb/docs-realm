To find an Application ID, make a request to the {+service-short+}
:admin-api-endpoint:`GET /groups/{groupid}/apps <operation/adminListApplications>` API endpoint.

This request has the following format, referencing the ``access_token`` and the Group ID:

.. code-block:: sh

   curl --request GET \
     --header 'Authorization: Bearer <access_token>' \
     https://realm.mongodb.com/api/admin/v3.0/groups/{groupId}/apps

This will return a list of objects describing each {+app+} in the provided
group. For Admin API requests, your Application ID is the ObjectId value in the
``_id`` field, *not* the ``client_app_id``.

.. example::

   .. code-block:: json
      :emphasize-lines: 3
      
      [
        {
            "_id": "5997529e46224c6e42gb6dd9",
            "group_id": "57879f6cc4b32dbe440bb8c5",
            "domain_id": "5886619e46124e4c42fb5dd8",
            "client_app_id": "myapp-abcde",
            "name": "myapp",
            "location": "US-VA",
            "deployment_model": "GLOBAL",
            "last_used": 1615153544,
            "last_modified": 0,
            "product": "standard",
            "environment": ""
        }
      ]
