To log in with custom JWT authentication, create a
custom JWT credential by calling ``Credentials.jwt()``
with your custom JWT. Then pass the generated credential
to ``app.login()`` or ``app.loginAsync()``.
