.. warning::

   If your :manual:`oplog </core/replica-set-oplog/>` rolls past the 
   time that you paused {+sync-short+}, you must terminate and re-enable 
   {+sync-short+}. For example, if you only keep 12 hours of oplog for your 
   cluster, and you pause {+sync-short+} for longer than 12 hours, you must
   terminate and re-enable {+sync-short+}.

   Terminating and re-enabling paused {+sync+} for your {+app+} erases 
   {+sync+} metadata and requires you to specify configuration settings again. 
   Clients must perform a client reset when they reconnect after {+sync+} has
   been terminated. For more information, see: :ref:`Terminate Sync <terminating-realm-sync>`.