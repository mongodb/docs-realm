To set initial subscriptions, include the ``initialSubscriptions`` field in
your realm's :js-sdk:`SyncConfiguration <types/FlexibleSyncConfiguration.html>`.
Within the ``initialSubscriptions`` object, add an ``update``
field set to a callback that subscribes to queries.

By default, initial subscriptions are only created the first time the database
is opened. If your app needs to rerun this initial subscription every time the app
starts, you can set ``rerunOnOpen`` to ``true``. You might need to do this to
re-run dynamic time ranges or other queries that require a re-computation of
static variables for the subscription.
