.. note::
   The |pause_func_name| method gives developers control over what time of day the device sync. 
   It is designed and tested with temporary use cases in mind.

   Examples of when to use |pause_func_name| include: 
   * Syncing only in the evening
   * Spreading the sync load out across different times
   * Conserving battery
   
   The |pause_func_name| function is not intended to determine if a Realm should sync for
   indefinite periods of time, or time ranges in months and years. The functionality
   is not tested for these use cases, and you could encounter a range of issues
   when using it this way. These issues can relate to:  
   * Syncing stores the operations that create the changes, which can quickly grow to 
   become much larger than the actual state
   * Issues related to :ref:`compaction <glossary-compaction-definition>` of data
