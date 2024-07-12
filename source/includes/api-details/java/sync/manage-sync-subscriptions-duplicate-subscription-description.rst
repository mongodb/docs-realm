Subscription names must be unique. Adding a subscription 
with the same name as an existing subscription throws an error.

If you do not explicitly name a subscription, and instead subscribe 
to the same unnamed query more than once, the SDD does not persist 
duplicate queries to the subscription set. 

If you subscribe to the same query more than once under different names, 
the SDK persists both subscriptions to the subscription set.
