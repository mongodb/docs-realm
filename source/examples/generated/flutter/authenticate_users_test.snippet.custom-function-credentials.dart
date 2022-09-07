Map<String, String> credentials = {
  "username": "someUsername",
};
// payload must be a JSON-encoded string
String payload = jsonEncode(credentials);

Credentials customCredentials = Credentials.function(payload);
User currentUser = await app.logIn(customCredentials);
