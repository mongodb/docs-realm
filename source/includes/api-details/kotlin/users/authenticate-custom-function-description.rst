To log in with Custom Function authentication, pass your custom arguments 
as a payload to :kotlin-sync-sdk:`Credentials.customFunction()
<io.realm.kotlin.mongodb/-credentials/-companion/custom-function.html>`, 
and then pass the generated credential to :kotlin-sync-sdk:`app.login()
<io.realm.kotlin.mongodb/-app/login.html>`.

.. versionadded:: 1.9.0

You can serialize data for a Custom Function credential using an 
EJSON encoder. For more information, including examples, refer to 
:ref:`sdks-serialization`.
