If event ordering is enabled, multiple executions of this Trigger will occur
sequentially based on the timestamps of the change events. If event ordering is
disabled, multiple executions of this Trigger will occur independently.

.. tip::
   
   Consider disabling event ordering if your trigger fires on a collection that
   receives short bursts of events (e.g. inserting data as part of a daily batch
   job).
   
   Ordered Triggers wait to execute a Function for a particular event until the
   Functions of previous events have finished executing. As a consequence,
   ordered Triggers are effectively rate-limited by the run time of each
   sequential Trigger function. This may cause a significant delay between the
   database event and the Trigger firing if a sufficiently large number of
   Trigger executions are currently in the queue.
   
   Unordered Triggers execute functions in parallel if possible, which can be
   significantly faster (depending on your use case) but does not guarantee that
   multiple executions of a Trigger Function occur in event order.
