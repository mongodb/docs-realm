.. versionadded:: 1.9.0

Kotlin SDK version 1.9.0 introduced an API that supports: 

- A limited but stable EJSON encoder for user metadata returned by ``User.profileAsBsonDocument()``
- An experimental EJSON encoder that supports full document serialization for user 
  metadata returned by the :kotlin-sync-sdk:`User.profile()
  <io.realm.kotlin.mongodb.ext/profile.html>` extension method. This encoder
  and method requires experimental opt-in. 

You must add the official
`Kotlin Serialization <https://github.com/Kotlin/kotlinx.serialization>`__
library to your project to use the Kotlin SDK's EJSON serialization.
For more information, refer to :ref:`Serialization <sdks-serialization>`. 
