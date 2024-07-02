You can copy an SDK object to a :kotlin-sdk:`MutableRealm
<io.realm.kotlin/-mutable-realm/index.html>` instance with the 
:kotlin-sdk:`copyToRealm() <io.realm.kotlin/-mutable-realm/copy-to-realm.html>`
method. The :kotlin-sdk:`UpdatePolicy <io.realm.kotlin/-update-policy/index.html>`
you specify determines how to handle copying objects where the target database
instance already contains an object with a matching primary key.
