String token = await authenticateWithExternalSystem();
Credentials jwtCredentials = Credentials.jwt(token);
User currentUser = await app.logIn(jwtCredentials);
