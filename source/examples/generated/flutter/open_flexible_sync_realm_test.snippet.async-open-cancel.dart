Configuration config =
    Configuration.flexibleSync(currentUser, [Tricycle.schema]);

CancellationToken token = CancellationToken();
// Cancel operation after 5 seconds.
Future<void>.delayed(const Duration(seconds: 5), () => token.cancel());

Realm fullySyncedRealm =
    await Realm.open(config, cancellationToken: token);
