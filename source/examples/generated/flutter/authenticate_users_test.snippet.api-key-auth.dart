ApiKey myApiKey = await user.apiKeys.create('myApiKey');
Credentials apiKeyCredentials = Credentials.apiKey(myApiKey.value!);
final apiKeyUser = await app.logIn(apiKeyCredentials);
