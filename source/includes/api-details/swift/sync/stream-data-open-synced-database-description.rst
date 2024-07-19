Specify the ``AsymmetricObject`` types you want to sync.

.. note:: Mixed Synced and Non-Synced Databases in Projects

    The ``AsymmetricObject`` type is incompatible with non-synced databases.
    If your project uses both a synced and non-synced database, you must 
    explicitly :ref:`pass a subset of classes in your database configuration 
    <sdks-provide-a-subset-of-models-to-a-database>` to exclude the 
    ``AsymmetricObject`` from your non-synced database.
    
    Automatic schema discovery means that opening a non-synced database
    without specifically excluding the ``AsymmetricObject`` from the 
    configuration can throw an error related to trying to use an 
    incompatible object type.
