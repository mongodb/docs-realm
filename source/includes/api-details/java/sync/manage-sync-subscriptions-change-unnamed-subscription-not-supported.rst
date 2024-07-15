The Java SDK does not support updating subscriptions created without a name.
If you know in advance that your app may need to change subscriptions,
:ref:`create the subscription with a name <sdks-add-named-subscription>`.

Alternately, you can look up unnamed subscriptions by query, :ref:`remove them
from the subscription set <sdks-remove-subscriptions>`, and :ref:`create a new
subscription <sdks-sync-subscriptions-add-subscription>` with the desired query.
