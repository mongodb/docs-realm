You can set initial subscriptions through the
:swift-sdk:`flexibleSyncConfiguration() 
<Extensions/User.html#/s:So7RLMUserC10RealmSwiftE25flexibleSyncConfigurationAC0B0V0F0VyF>`.
Pass the ``initialSubscriptions`` parameter with the subscription queries 
you want to use to bootstrap the database:

.. literalinclude:: /examples/generated/code/start/FlexibleSync.snippet.add-initial-subscriptions.swift
   :language: swift

If your app needs to rerun this initial subscription every time the app starts,
you can pass an additional parameter - ``rerunOnOpen``. This is a bool that 
denotes whether the initial subscription should re-run every time the 
app starts. You might need to do this to re-run dynamic time ranges 
or other queries that require a re-computation of static variables for the 
subscription.

In this example, we don't want users to be overwhelmed by irrelevant tasks,
so we'll load only tasks due within the previous 7 days and the next 7 days.
Tasks that were due more than a week ago are no longer relevant, and tasks
that are due further out than the next week are also not relevant. With
``rerunOnOpen`` here, the query dynamically recalculates the relevant 
objects to sync based on the desired date range every time the app starts.
