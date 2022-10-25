final token = CancellationToken();

// Cancel the open operation after 30 seconds.
// Alternatively, you could display a loading dialog and bind the cancellation
// to a button the user can click to stop the wait.
Future<void>.delayed(const Duration(seconds: 30), () => token.cancel());

final realm = await Realm.open(config, cancellationToken: token);
