Use the :dotnet-sdk:`SubscriptionSet.WaitForSynchronizationAsync()
<reference/Realms.Sync.SubscriptionSet.html#Realms_Sync_SubscriptionSet_WaitForSynchronizationAsync_System_Nullable_System_Threading_CancellationToken__>`
method to wait for the server to acknowledge this set of subscriptions. If the
server rejects the change, the :dotnet-sdk:`SubscriptionSetState
<reference/Realms.Sync.SubscriptionSetState.html>` will be an error state, and
an exception will be thrown.

An exception may occur if: 

- An unsupported query is subscribed to. Subscribing to an unsupported query 
  will pause synchronization. To resume synchronization, :ref:`remove the 
  unsupported query <sdks-remove-subscriptions>`.

- You are performing an invalid action, such as adding an object that does not 
  match a subscription. This triggers a :ref:`client reset <client-resets>`: 
  data is erased from the device, and a new copy of the data is created without 
  any subscriptions in the set.
