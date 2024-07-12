You can check the :js-sdk:`subscription state <classes/SubscriptionSet.html#state>` 
to see if the server has acknowledged the subscription and the device has
downloaded the data locally.

You can use subscription state to:

- Trigger error handling
- Show if the transaction is pending or has completed
- Find out when a subscription set is superseded, and you should obtain a
  new instance of the subscription set to write a subscription change

The :js-sdk:`SubscriptionSetState enum <enums/SubscriptionSetState.html>`
provides information about the status of a subscription.
