Subscription names must be unique. Trying to append a subscription 
with the same name as an existing subscription throws an error.

If you do not explicitly name a subscription, and instead subscribe 
to the same unnamed query more than once, the SDK does not persist 
duplicate queries to the subscription set. 

If you subscribe to the same query more than once under different names, 
the SDK persists both subscriptions to the subscription set.

If your application flow appends the same named subscription to the subscription 
set every time you run the application, add a check for an existing subscription
before appending it.

.. literalinclude:: /examples/generated/code/start/FlexibleSync.snippet.check-before-adding-subscription.swift
   :language: swift
