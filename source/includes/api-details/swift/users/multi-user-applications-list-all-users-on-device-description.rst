You can access a map of all known user accounts that are stored on 
the device through the ``app.allUsers`` property. This property returns all
users that have logged in to the client app on a given device regardless of
whether they are currently authenticated (the ``user.state`` is logged in or
logged out).

In the following example, the SDK returns both Emma and Joe's 
:objc-sdk:`user.identifier <Classes/RLMUser.html#/c:objc(cs)RLMUser(py)identifier>`:
