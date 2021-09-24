.. note::
   Use the |pause_func_name| method to control when a device syncs. 
   You should only use it for temporary and short-term pauses of syncing.

   Examples of when to use |pause_func_name| include: 

   - Syncing data only at specified time of day
   - Conserving device battery use
   
   Don't use the |pause_func_name| method to stop syncing for
   indefinite time periods or time ranges in months and years. The functionality
   is not designed or tested for these use cases, and you could encounter a range of issues
   when using it this way.
