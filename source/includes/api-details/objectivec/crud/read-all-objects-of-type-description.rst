To query for objects of a given type in the database, pass the database
instance to :objc-sdk:`+[YourSDKObjectClass allObjectsInRealm:]
<Classes/RLMObject.html#/c:objc(cs)RLMObject(cm)allObjectsInRealm:>`.
Replace ``YourSDKObjectClass`` with your SDK object class
name. This returns an :objc-sdk:`RLMResults
<Classes/RLMResults.html>` object representing all objects of the
given type in the database.
