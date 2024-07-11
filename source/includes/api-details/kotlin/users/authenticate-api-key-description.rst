To log in with API key authentication, create an API Key credential 
by calling :kotlin-sync-sdk:`Credentials.apiKey()
<io.realm.kotlin.mongodb/-credentials/-companion/api-key.html>`
with the user's API key, and then passing the 
generated credential to :kotlin-sync-sdk:`app.login()
<io.realm.kotlin.mongodb/-app/login.html>`:
