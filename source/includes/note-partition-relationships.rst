.. important:: Relationships cannot span partitions

   If you are using :ref:`Partition-Based Sync <partition-based-sync>`, all 
   related objects must share a common :term:`partition key`. The objects can 
   exist in different databases and collections (within the same cluster). To 
   understand how partitions can span multiple databases and collections, see 
   :ref:`<sync-partitions>`.