// Create an App instance once on main isolate,
// ideally as soon as the app starts
final appConfig = AppConfiguration(APP_ID);
final app = App(appConfig);
final appId = app.id;
// Later, access the App instance on background isolate
await Isolate.spawn((List<Object> args) async {
  final sendPort = args[0] as SendPort;
  final appId = args[1] as String;

  try {
    final app = App.getById(appId); 

    // ... Access App users 
    final user = app?.currentUser!;

    // ... Open and use the synced database as usual

    sendPort.send('Background task completed');
  } catch (e) {
    sendPort.send('Error: $e');
  }
}, [receivePort.sendPort, appId]);
