The configuration file to link an Atlas cluster should have the
following form:

.. code-block:: json
   :caption: ``config.json``

   {
     "id": "<Service ID>",
     "name": "<Service Name>",
     "type": "mongodb-atlas",
     "config": {
       "clusterName": "<Atlas Cluster Name>",
       "readPreference": "<Read Preference>",
       "wireProtocolEnabled": <Boolean>,
       "sync": <Sync Configuration>
     }
   }

The configuration file to link a Data Lake should have the following form:

.. code-block:: json
   :caption: ``config.json``

   {
     "id": "<Service ID>",
     "name": "<Service Name>",
     "type": "datalake",
     "config": {
        "dataLakeName": "<Data Lake>"
      }
    }

Exactly one of ``config.dataLakeName`` and ``config.clusterName`` is
required, depending on whether you are linking a Data Lake or a cluster.

.. list-table::
   :header-rows: 1
   :widths: 10 30

   * - Field
     - Description
   
   * - | ``id``
       | String
     - A string that uniquely identifies the service. {+service-short+}
       automatically generates a unique ID for a MongoDB service when you create
       it.
   
   * - | ``name``
       | String
     - The name of the service. The name may be at most 64 characters
       long and can only contain ASCII letters, numbers, underscores,
       and hyphens. For clusters, the default name is ``mongodb-atlas``.
       For Data Lakes, it is ``mongodb-datalake``.
   
   * - | ``type``
       | String
     - For MongoDB Atlas clusters, this value is always ``"mongodb-atlas"``.
       For Data Lakes, this value is ``"datalake"``.
   
   * - | ``config.clusterName``
       | String
     - Required when linking a cluster. The name of the service's linked cluster in MongoDB Atlas.
   
   * - | ``config.dataLakeName``
       | String   
     - Required when linking a Data Lake. The name of the Data Lake that you want to link to your application.

   * - | ``config.readPreference``
       | String
     - The :ref:`read preference <read-preference>` mode for queries sent
       through the service. Not available for Data Lakes.
       
       .. include:: /mongodb/tables/read-preference-modes.rst
   
   * - | ``config.sync``
       | Document
     - A configuration document that determines if a cluster is :doc:`synced
       </sync>` and, if it is, defines the rules for sync operations on the
       cluster. Not available for Data Lakes.

       For detailed information on sync configuration documents, see
       :ref:`Synced Cluster Configuration <mongodb-service-sync-rules>`.
