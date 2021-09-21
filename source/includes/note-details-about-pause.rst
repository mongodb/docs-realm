.. note::
   The ``pause`` function is designed for controlling when devices sync. 
   
   Examples of when to use ``pause`` include: 
   -  Syncing only in the evening
   - Spreading the sync load out across different times
   - Conserving battery
   
   ## is there an upper bound of how long the sync should take?
   ## even a general rule of thumb would be OK 
   ##
   ## my $.02 is that we should not say more that whatever the general rule of thumb is 
   ## here, and then put any further discussion in a different page, as this seems like a 
   ## fairly complex topic. 
   The ``pause`` function is not intended to determine if a Realm should never sync. 
   As a general principle, Realm sync pauses should not excede XXX_UNIT_OF_TIME. 
   Pauses that exceed this much time can cause unexpected issues.  

   ## probable scraps 
   ## what type of storage issues would these be? 
   For instance, you use ``pause`` for a prolonged period of time, you could encounter
   issues with storage when you do attempt to sync because the synced Realm 
   also stores the operations that created the change. These operations can excede 
   4x the storage of the actual data stored in the Realm. 
   These operations get pruned from the Realm after they sync. 
   
   Another issue you could run into if you sync a Realm after a long pause is there is a server-side feature know as compaction 
   which prunes the operations from the server-side partitions. After a set amount of 
   time it starts pruning old operations if the serverside prunes operations from the 
   partition which is paused then a client could experience a client reset. This will 
   probably not be an issue if the partition you are running is a per-user private realm. 
   It is more of an issue with shared realms.

