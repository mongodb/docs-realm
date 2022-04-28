.. important:: Relationships cannot span partitions

   When using :ref:`Partition-Based Sync <partition-based-sync>`, 
   you must ensure that objects within a relationship share a common 
   :ref:`<partition-key>`. The objects can exist in different databases and 
   collections (within the same cluster) as long as the partition key matches. 
   To understand how partitions can span multiple databases and collections, 
   see :ref:`<sync-partitions>`.
   