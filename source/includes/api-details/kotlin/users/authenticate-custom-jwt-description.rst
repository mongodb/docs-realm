To log in with JWT authentication, create a
JWT credential by calling :kotlin-sync-sdk:`Credentials.jwt()
<io.realm.kotlin.mongodb/-credentials/-companion/jwt.html>`
with the user's JWT, and then pass the generated credential
to :kotlin-sync-sdk:`app.login()
<io.realm.kotlin.mongodb/-app/login.html>`:
