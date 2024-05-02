    // Specify a baseUrl to connect to a server other than the default.
    // In this case, an Edge Server instance running on the device.
    final appConfig = AppConfiguration(EDGE_SERVER_APP_ID,
        baseUrl: Uri.parse('http://localhost:80'));

var app = App(appConfig);
