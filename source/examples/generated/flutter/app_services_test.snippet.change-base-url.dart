// Specify a custom baseUrl to connect to.
// In this case, an Edge Server instance running on the device.
final appConfig = AppConfiguration(edgeServerAppId,
    baseUrl: Uri.parse('http://localhost:80'));

var app = App(appConfig);

// ... log in a user and use the app ...

// Later, change the baseUrl to the default:
// https://services.cloud.mongodb.com
await app.updateBaseUrl(null);
