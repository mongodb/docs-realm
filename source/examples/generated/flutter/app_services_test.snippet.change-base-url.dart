// Specify a custom baseUrl to connect to.
final appConfig = AppConfiguration(EDGE_SERVER_APP_ID,
    baseUrl: Uri.parse('http://localhost:80'));

var app = App(appConfig);

// ... log in a user and use the app ...

// Later, change the baseUrl to a different server
app.updateBaseUrl(Uri.parse('https://services.cloud.mongodb.com'));
